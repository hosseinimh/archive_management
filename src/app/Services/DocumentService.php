<?php

namespace App\Services;

use App\Models\Document as Model;
use Illuminate\Support\Facades\DB;

class DocumentService
{
    public function get(int $id): mixed
    {
        return Model::join('tbl_users', 'tbl_documents.user_id', 'tbl_users.id')->where('tbl_documents.id', $id)->select('tbl_documents.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family')->first();
    }

    public function getLastInYear(int $year): mixed
    {
        return Model::join('tbl_users', 'tbl_documents.user_id', 'tbl_users.id')->where('tbl_documents.document_no', 'LIKE', $year . '/%')->select('tbl_documents.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family')->orderBy('tbl_documents.document_no', 'DESC')->first();
    }

    public function getPaginate(string $documentNo, ?string $documentDate, ?string $paymentNo, ?string $paymentDate, ?string $owner, int $page, int $pageItems): mixed
    {
        return $this->handleGetList($documentNo, $documentDate, $paymentNo, $paymentDate, $owner)->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAllQuery(string $documentNo, ?string $documentDate, ?string $paymentNo, ?string $paymentDate, ?string $owner): mixed
    {
        return $this->handleGetList($documentNo, $documentDate, $paymentNo, $paymentDate, $owner);
    }

    public function store(string $documentNo, ?string $documentDate, ?string $paymentNo, ?string $paymentDate, ?string $owner, ?string $description, int $userId): mixed
    {
        $documentDate = strlen($documentDate) === 8 ? substr($documentDate, 0, 4) . "/" . substr($documentDate, 4, 2) . "/" . substr($documentDate, 6) : null;
        $paymentDate = strlen($paymentDate) === 8 ? substr($paymentDate, 0, 4) . "/" . substr($paymentDate, 4, 2) . "/" . substr($paymentDate, 6) : null;
        $data = [
            'document_no' => $documentNo,
            'document_date' => $documentDate,
            'payment_no' => $paymentNo,
            'payment_date' => $paymentDate,
            'owner' => $owner,
            'description' => $description,
            'user_id' => $userId,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $documentNo, ?string $documentDate, ?string $paymentNo, ?string $paymentDate, ?string $owner, ?string $description, int $userId): bool
    {
        $paymentDate = strlen($paymentDate) === 8 ? substr($paymentDate, 0, 4) . "/" . substr($paymentDate, 4, 2) . "/" . substr($paymentDate, 6) : null;
        $data = [
            'document_no' => $documentNo,
            'document_date' => $documentDate,
            'payment_no' => $paymentNo,
            'payment_date' => $paymentDate,
            'owner' => $owner,
            'description' => $description,
            'user_id' => $userId,
        ];
        return $model->update($data);
    }

    public function count(): int
    {
        return Model::count();
    }

    public function getSummary()
    {
        return Model::join('tbl_users', 'tbl_documents.user_id', 'tbl_users.id')->select(DB::raw('COUNT(*) AS count'), DB::raw('SUBSTRING(`document_no`,1,4) AS year'))->groupBy('year')->orderBy('year', 'ASC')->get();
    }

    private function handleGetList(string $documentNo, ?string $documentDate, ?string $paymentNo, ?string $paymentDate, ?string $owner): mixed
    {
        $documentDate = strlen($documentDate) === 8 ? substr($documentDate, 0, 4) . "/" . substr($documentDate, 4, 2) . "/" . substr($documentDate, 6) : null;
        $paymentDate = strlen($paymentDate) === 8 ? substr($paymentDate, 0, 4) . "/" . substr($paymentDate, 4, 2) . "/" . substr($paymentDate, 6) : null;
        $query = Model::join('tbl_users', 'tbl_documents.user_id', 'tbl_users.id')
            ->where('document_no', 'LIKE', $documentNo . '%');
        if ($documentDate !== null) {
            $query->where('document_date', 'LIKE', '%' . $documentDate . '%');
        }
        if ($paymentNo !== null) {
            $query->where('payment_no', 'LIKE', '%' . $paymentNo . '%');
        }
        if ($paymentDate !== null) {
            $query->where('payment_date', 'LIKE', '%' . $paymentDate . '%');
        }
        if ($owner !== null) {
            $query->where('owner', 'LIKE', '%' . $owner . '%');
        }
        return $query->select('tbl_documents.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family', DB::raw('COUNT(*) OVER() AS items_count'))->orderBy('tbl_documents.created_at', 'DESC')->orderBy('tbl_documents.id', 'DESC');
    }
}
