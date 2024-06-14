<?php

namespace App\Exports;

use App\Services\ErrorService;
use DateTime;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithDefaultStyles;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Style;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class ErrorExport implements FromQuery, WithMapping, WithHeadings, ShouldAutoSize, WithDefaultStyles, WithStyles
{
    private int $index;

    public function __construct()
    {
        $this->index = 1;
    }

    public function defaultStyles(Style $defaultStyle)
    {
        return [
            'alignment' => [
                'vertical' => Alignment::VERTICAL_TOP,
            ],
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            'A:F'  => [
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_LEFT,
                ]
            ],
        ];
    }

    public function headings(): array
    {
        return [
            __('error.excel_row_no'),
            __('error.excel_message'),
            __('error.excel_created_at'),
        ];
    }

    public function query()
    {
        $errorService = new ErrorService();
        return $errorService->getAllQuery();
    }

    public function prepareRows($rows)
    {
        return $rows->transform(function ($item) {
            return $item;
        });
    }

    public function map($item): array
    {
        return [
            $this->index++,
            $item->message,
            (new DateTime($item->created_at))->format('Y-m-d H:i:s'),
        ];
    }
}
