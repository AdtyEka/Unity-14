<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiValidationService
{
    protected string $baseUrl;

    protected string $token;

    public function __construct()
    {
        $this->baseUrl = config('services.ai_recommendation.base_url');
        $this->token = config('services.ai_recommendation.token');
    }

    /**
     * Validate anthropometry data using external AI service.
     */
    public function validate(array $inputData): ?array
    {
        $promptTemplate = File::get(base_path('prompt-validasi.txt'));

        $prompt = $promptTemplate."\n\nInput:\n".json_encode($inputData);

        try {
            $response = Http::timeout(20)
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

                $fullText = '';
                if (is_array($data)) {
                    foreach ($data as $chunk) {
                        if (isset($chunk['candidates'][0]['content']['parts'][0]['text'])) {
                            $fullText .= $chunk['candidates'][0]['content']['parts'][0]['text'];
                        }
                    }
                } else {
                    $fullText = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
                }

                // Clean up markdown
                $fullText = preg_replace('/```json\s*|\s*```/', '', $fullText);

                return json_decode(trim($fullText), true);
            }

            Log::error('AI Validation API Error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
        } catch (\Exception $e) {
            Log::error('AI Validation Exception', [
                'error' => $e->getMessage(),
            ]);
        }

        return null;
    }
}
