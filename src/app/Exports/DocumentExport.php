<?php

namespace App\Exports;

use App\Services\DocumentService;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithDefaultStyles;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Style;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class DocumentExport implements FromQuery, WithMapping, WithHeadings, ShouldAutoSize, WithDefaultStyles, WithStyles, WithEvents, WithColumnWidths
{
    public function __construct(
        private ?string $documentYear,
        private ?string $documentNo,
        private ?string $documentDate,
        private ?string $paymentNo,
        private ?string $paymentDate,
        private ?string $owner,
    ) {
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->getDelegate()->setRightToLeft(true);
                $event->sheet->getDelegate()->freezePane('A2');
            },
        ];
    }

    public function defaultStyles(Style $defaultStyle)
    {
        return [
            'alignment' => [
                'vertical' => Alignment::VERTICAL_TOP,
                'horizontal' => Alignment::HORIZONTAL_RIGHT,
            ],
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1    => ['fill' => [
                'fillType'   => Fill::FILL_SOLID,
                'startColor' => ['argb' => '7C95C6'],
            ]],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 11,
            'B' => 11,
            'C' => 15,
            'D' => 15,
            'E' => 35,
            'F' => 135,
        ];
    }

    public function headings(): array
    {
        return [
            __('document.excel_document_no'),
            __('document.excel_document_date'),
            __('document.excel_payment_no'),
            __('document.excel_payment_date'),
            __('document.excel_owner'),
            __('document.excel_description'),
        ];
    }

    public function query()
    {
        $documentService = new DocumentService();
        return $documentService->getAllQuery(
            $this->documentYear,
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
        return [
            $item->document_year . '/' . $item->document_no,
            $item->document_date ?? '-',
            $item->payment_no ?? '-',
            $item->payment_date ?? '-',
            $item->owner ?? '-',
            $item->description
        ];
    }
}
