<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiRecommendationService
{
    protected string $baseUrl;

    protected string $token;

    public function __construct()
    {
        $this->baseUrl = config('services.ai_recommendation.base_url');
        $this->token = config('services.ai_recommendation.token');
    }

    /**
     * Generate recommendation using external AI service.
     */
    public function generate(array $inputData): ?array
    {
        $promptTemplate = File::get(base_path('prompt-rekomendasi.txt'));

        $prompt = $promptTemplate."\n\nInput:\n".$this->formatInput($inputData);

        try {
            $response = Http::timeout(60)
                ->post($this->baseUrl.'?key='.$this->token, [
                    'contents' => [
                        [
                            'role' => 'user',
                            'parts' => [
                                ['text' => $prompt],
                            ],
                        ],
                    ],
                ]);

            if ($response->successful()) {
                $data = $response->json();

                // If streamGenerateContent is used, it returns an array of chunks.
                // We need to extract the text from the candidates.
                $fullText = '';
                if (is_array($data)) {
                    foreach ($data as $chunk) {
                        if (isset($chunk['candidates'][0]['content']['parts'][0]['text'])) {
                            $fullText .= $chunk['candidates'][0]['content']['parts'][0]['text'];
                        }
                    }
                } else {
                    // Fallback for single response if it wasn't a stream
                    $fullText = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
                }

                // Clean up markdown if AI returns it
                $fullText = preg_replace('/```json\s*|\s*```/', '', $fullText);

                return json_decode(trim($fullText), true);
            }

            Log::error('AI Recommendation API Error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
        } catch (\Exception $e) {
            Log::error('AI Recommendation Exception', [
                'error' => $e->getMessage(),
            ]);
        }

        return null;
    }

    /**
     * Format input data for the prompt.
     */
    protected function formatInput(array $data): string
    {
        // Simple string representation of data for the AI
        $lines = [];
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $value = json_encode($value);
            }
            $lines[] = ucfirst(str_replace('_', ' ', (string) $key)).': '.$value;
        }

        return implode("\n", $lines);
    }
}
