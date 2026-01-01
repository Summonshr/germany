<?php

function generateTopicJson($slug, $name, $words, $sentences)
{
    $data = [];
    $allDe = array_merge(array_column($words, 1), array_column($sentences, 1));

    // Process Words
    foreach ($words as $w) {
        $text = $w[0];
        $textDe = $w[1];
        $options = [$textDe];
        $others = array_diff($allDe, [$textDe]);
        shuffle($others);
        $options = array_merge($options, array_slice($others, 0, 3));
        shuffle($options);

        $data[] = [
            'type' => 'vocabulary',
            'text' => $text,
            'text_de' => $textDe,
            'synonyms' => [],
            'description' => "German word for '$text'.",
            'description_de' => "Deutsches Wort für '$text'.",
            'note' => '-',
            'note_de' => '-',
            'culture' => null,
            'culture_de' => null,
            'options_de' => $options,
        ];
    }

    // Process Sentences
    foreach ($sentences as $s) {
        $text = $s[0];
        $textDe = $s[1];
        $options = [$textDe];
        $others = array_diff($allDe, [$textDe]);
        shuffle($others);
        $options = array_merge($options, array_slice($others, 0, 3));
        shuffle($options);

        $data[] = [
            'type' => 'sentence',
            'text' => $text,
            'text_de' => $textDe,
            'synonyms' => [],
            'description' => "Example sentence for '$name'.",
            'description_de' => "Beispielsatz für '$name'.",
            'note' => '-',
            'note_de' => '-',
            'culture' => null,
            'culture_de' => null,
            'options_de' => $options,
        ];
    }

    file_put_contents("public/vocabulary/{$slug}.json", json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo "Generated {$slug}.json with ".count($data)." items.\n";
}

// Example usage to be appended or called via run_command
