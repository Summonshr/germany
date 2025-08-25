<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

class SaveQuizData extends Data
{
    public function __construct(
        public string $quiz,
        public int $current_question,
        /** @var DataCollection<SelectedAnswerData> */
        #[DataCollectionOf(SelectedAnswerData::class)]
        public DataCollection $selected_answers,
    ) {}
}
