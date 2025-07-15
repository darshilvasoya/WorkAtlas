<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Company;

// POST: Import companies with coordinates
Route::post('/import-companies', function (Request $request) {
    $json = $request->getContent();
    $data = json_decode($json, true);
    if (!is_array($data)) return response()->json(['error' => 'Invalid JSON format'], 400);

    $count = 0;
    foreach ($data as $company) {
        if (!isset($company['name'])) continue;

        $exists = Company::where('name', $company['name'])
            ->where('address', $company['address'] ?? '')
            ->exists();

        if ($exists) continue;

        Company::create([
            'name' => $company['name'],
            'category' => $company['category'] ?? null,
            'address' => $company['address'] ?? null,
            'phone' => $company['phone'] ?? null,
            'website' => $company['website'] ?? null,
            'city' => $company['city'] ?? null,
            'latitude' => $company['latitude'] ?? null,
            'longitude' => $company['longitude'] ?? null,
        ]);

        $count++;
    }

    return response()->json(['success' => true, 'imported' => $count]);
});

// GET: Companies with optional filters
Route::get('/companies', function (Request $request) {
    $query = Company::query();

    if ($request->filled('city')) {
        $query->where('city', $request->city);
    }

    if ($request->filled('category')) {
        $query->where('category', $request->category);
    }

    return response()->json($query->get());
});

// GET: Distinct Cities
Route::get('/cities', function () {
    $cities = Company::select('city')->distinct()->pluck('city')->filter()->values();
    return response()->json($cities);
});

// GET: Distinct Categories
Route::get('/categories', function () {
    $categories = Company::select('category')->distinct()->pluck('category')->filter()->values();
    return response()->json($categories);
});
