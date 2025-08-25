<?php

declare(strict_types=1);

use Rector\CodingStyle\Rector\Encapsed\EncapsedStringsToSprintfRector;
use Rector\Config\RectorConfig;
use Rector\DeadCode\Rector\ClassMethod\RemoveUnusedPromotedPropertyRector;
use Rector\Set\ValueObject\SetList;
use Rector\TypeDeclaration\Rector\ClassMethod\AddReturnTypeDeclarationRector;
use Rector\TypeDeclaration\Rector\ClassMethod\AddVoidReturnTypeWhereNoReturnRector;
use Rector\TypeDeclaration\Rector\Property\TypedPropertyFromAssignsRector;
use RectorLaravel\Rector\ClassMethod\AddGenericReturnTypeToRelationsRector;
use RectorLaravel\Rector\MethodCall\EloquentWhereRelationTypeHintingParameterRector;
use RectorLaravel\Rector\MethodCall\EloquentWhereTypeHintClosureParameterRector;
use RectorLaravel\Rector\StaticCall\EloquentMagicMethodToQueryBuilderRector;
use RectorLaravel\Set\LaravelLevelSetList;
use RectorLaravel\Set\LaravelSetList;

return RectorConfig::configure()
    ->withPaths([
        __DIR__.'/app',
        __DIR__.'/config',
        __DIR__.'/database',
        __DIR__.'/routes',
        __DIR__.'/tests',
    ])
    ->withSkip([
        __DIR__.'/bootstrap',
        __DIR__.'/storage',
        __DIR__.'/vendor',
        __DIR__.'/_ide_helper.php',
        __DIR__.'/.phpstorm.meta.php',
        __DIR__.'/public/index.php',
        '*/migrations/*',
        '*/node_modules/*',
        '*/cache/*',
        '*/compiled.php',
        EncapsedStringsToSprintfRector::class, // Can break blade templates
    ])
    ->withPhpSets(php82: true)
    ->withSets([
        // Core PHP improvements
        SetList::CODE_QUALITY,
        SetList::CODING_STYLE,
        SetList::DEAD_CODE,
        SetList::STRICT_BOOLEANS,
        SetList::PRIVATIZATION,
        SetList::TYPE_DECLARATION,
        SetList::EARLY_RETURN,
        SetList::INSTANCEOF,

        // Laravel-specific improvements (removed duplicates)
        LaravelLevelSetList::UP_TO_LARAVEL_120,
        LaravelSetList::LARAVEL_CODE_QUALITY,
        LaravelSetList::LARAVEL_COLLECTION,
        LaravelSetList::LARAVEL_ELOQUENT_MAGIC_METHOD_TO_QUERY_BUILDER,
        LaravelSetList::LARAVEL_ARRAYACCESS_TO_METHOD_CALL,
        LaravelSetList::LARAVEL_ARRAY_STR_FUNCTION_TO_STATIC_CALL,
        LaravelSetList::LARAVEL_CONTAINER_STRING_TO_FULLY_QUALIFIED_NAME,
        LaravelSetList::LARAVEL_FACTORIES,
        LaravelSetList::LARAVEL_IF_HELPERS,
    ])
    ->withRules([
        // Enhanced type declarations
        AddReturnTypeDeclarationRector::class,
        AddVoidReturnTypeWhereNoReturnRector::class,
        TypedPropertyFromAssignsRector::class,
        RemoveUnusedPromotedPropertyRector::class,
        EloquentWhereTypeHintClosureParameterRector::class,
        EloquentWhereRelationTypeHintingParameterRector::class,
        EloquentMagicMethodToQueryBuilderRector::class,
        AddGenericReturnTypeToRelationsRector::class,
    ])
    ->withAttributesSets(
        doctrine: true,
        symfony: true,
        phpunit: true,
    )
    ->withPreparedSets(
        deadCode: true,
        codeQuality: true,
        codingStyle: true,
        typeDeclarations: true,
        privatization: true,
        naming: true,
        instanceOf: true,
        earlyReturn: true,
        strictBooleans: true,
    )
    ->withImportNames(
        importShortClasses: false,
        removeUnusedImports: true,
    )
    ->withParallel(
        timeoutSeconds: 120,
        maxNumberOfProcess: 16,
        jobSize: 10,
    );
