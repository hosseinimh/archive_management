<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Models\Document as Model;
use Exception;
use Illuminate\Support\Facades\DB;

class DocumentService
{
    public function get(int $id): mixed
    {
        return Model::join('tbl_users', 'tbl_documents.user_id', 'tbl_users.id')->where('tbl_documents.id', $id)->select('tbl_documents.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family')->first();
    }

    public function getLastInDocumentYear(int $documentYear): mixed
    {
        return Model::join('tbl_users', 'tbl_documents.user_id', 'tbl_users.id')->where('tbl_documents.document_year', $documentYear)->select('tbl_documents.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family')->orderBy('tbl_documents.document_no', 'DESC')->orderBy('tbl_documents.created_at', 'DESC')->orderBy('tbl_documents.id', 'DESC')->first();
    }

    public function getPaginate(int $documentYear, ?int $documentNo, ?string $documentDate, ?string $paymentNo, ?string $paymentDate, ?string $owner, int $page, int $pageItems): mixed
    {
        return $this->handleGetList($documentYear, $documentNo, $documentDate, $paymentNo, $paymentDate, $owner)->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAllQuery(int $documentYear, ?int $documentNo, ?string $documentDate, ?string $paymentNo, ?string $paymentDate, ?string $owner): mixed
    {
        return $this->handleGetList($documentYear, $documentNo, $documentDate, $paymentNo, $paymentDate, $owner);
    }

    public function store(int $documentYear, int $documentNo, ?string $documentDate, ?string $paymentNo, ?string $paymentDate, ?string $owner, ?string $description, int $userId): mixed
    {
        $this->throwIfDocumentNoNotUnique($documentYear, $documentNo);
        $documentDate = strlen($documentDate) === 8 ? substr($documentDate, 0, 4) . "/" . substr($documentDate, 4, 2) . "/" . substr($documentDate, 6) : null;
        $paymentDate = strlen($paymentDate) === 8 ? substr($paymentDate, 0, 4) . "/" . substr($paymentDate, 4, 2) . "/" . substr($paymentDate, 6) : null;
        $data = [
            'document_year' => $documentYear,
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

    public function update(Model $model, int $documentYear, int $documentNo, ?string $documentDate, ?string $paymentNo, ?string $paymentDate, ?string $owner, ?string $description, int $userId): bool
    {
        $this->throwIfDocumentNoNotUnique($documentYear, $documentNo, $model);
        $documentDate = strlen($documentDate) === 8 ? substr($documentDate, 0, 4) . "/" . substr($documentDate, 4, 2) . "/" . substr($documentDate, 6) : null;
        $paymentDate = strlen($paymentDate) === 8 ? substr($paymentDate, 0, 4) . "/" . substr($paymentDate, 4, 2) . "/" . substr($paymentDate, 6) : null;
        $data = [
            'document_year' => $documentYear,
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
        return Model::join('tbl_users', 'tbl_documents.user_id', 'tbl_users.id')->select(DB::raw('COUNT(*) AS count'), 'tbl_documents.document_year')->groupBy('document_year')->orderBy('document_year', 'ASC')->get();
    }

    private function handleGetList(int $documentYear, ?int $documentNo, ?string $documentDate, ?string $paymentNo, ?string $paymentDate, ?string $owner): mixed
    {
        $documentDate = strlen($documentDate) === 8 ? substr($documentDate, 0, 4) . "/" . substr($documentDate, 4, 2) . "/" . substr($documentDate, 6) : null;
        $paymentDate = strlen($paymentDate) === 8 ? substr($paymentDate, 0, 4) . "/" . substr($paymentDate, 4, 2) . "/" . substr($paymentDate, 6) : null;
        $query = Model::join('tbl_users', 'tbl_documents.user_id', 'tbl_users.id')
            ->where('document_year', $documentYear);
        if ($documentNo !== null) {
            $query->where('document_no', 'LIKE', '%' . $documentNo . '%');
        }
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
        return $query->select('tbl_documents.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family', DB::raw('COUNT(*) OVER() AS items_count'))->orderBy('tbl_documents.document_year', 'DESC')->orderBy('tbl_documents.document_no', 'DESC')->orderBy('tbl_documents.created_at', 'DESC')->orderBy('tbl_documents.id', 'DESC');
    }

    private function getByYearAndNo(int $documentYear, int $documentNo): mixed
    {
        return Model::where('tbl_documents.document_year', $documentYear)->where('tbl_documents.document_no', $documentNo)->orderBy('tbl_documents.created_at', 'DESC')->orderBy('tbl_documents.id', 'DESC')->first();
    }

    private function throwIfDocumentNoNotUnique(int $documentYear, int $documentNo, ?Model $targetModel = null)
    {
        if ($model = $this->getByYearAndNo($documentYear, $documentNo)) {
            if ($targetModel === null || $model->id !== $targetModel->id) {
                throw new Exception(__('document.document_no_unique'), ErrorCode::CUSTOM_ERROR);
            }
        }
        return;
    }
}
