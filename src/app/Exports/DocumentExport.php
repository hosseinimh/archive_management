<?php

namespace App\Exports;

use App\Services\DocumentService;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithDefaultStyles;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Style;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class DocumentExport implements FromQuery, WithMapping, WithHeadings, ShouldAutoSize, WithDefaultStyles, WithStyles, WithEvents
{
    private int $index;

    public function __construct(
        private ?string $documentNo,
        private ?string $documentDate,
        private ?string $paymentNo,
        private ?string $paymentDate,
        private ?string $owner,
    ) {
        $this->index = 1;
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->getDelegate()->setRightToLeft(true);
            },
        ];
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
                    'wrapText' => true,
                    'horizontal' => Alignment::HORIZONTAL_RIGHT,
                ]
            ],
        ];
    }

    public function headings(): array
    {
        return [
            __('document.excel_row_no'),
            __('document.excel_document_no'),
            __('document.excel_document_date'),
            __('document.excel_payment_no'),
            __('document.excel_payment_date'),
            __('document.excel_owner'),
        ];
    }

    public function query()
    {
        $documentService = new DocumentService();
        return $documentService->getAllQuery(
            $this->documentNo,
            $this->documentDate,
            $this->paymentNo,
            $this->paymentDate,
            $this->owner,
        );
    }

    public function prepareRows($rows)
    {
        return $rows->transform(function ($item) {
            return $item;
        });
    }

    public function map($item): array
    {
        $documentDate = $item->document_date;
        $documentDate = strlen($documentDate) === 8 ? substr($documentDate, 0, 4) . "/" . substr($documentDate, 4, 2) . "/" . substr($documentDate, 6) : '-';
        $paymentDate = $item->payment_date;
        $paymentDate = strlen($paymentDate) === 8 ? substr($paymentDate, 0, 4) . "/" . substr($paymentDate, 4, 2) . "/" . substr($paymentDate, 6) : '-';
        return [
            $this->index++,
            $item->document_no,
            $documentDate,
            $item->payment_no ?? '-',
            $paymentDate,
            $item->owner ?? '-'
        ];
    }
}
