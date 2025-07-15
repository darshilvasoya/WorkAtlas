<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Company;

class ImportCompanies extends Command
{
    protected $signature = 'import:companies';
    protected $description = 'Import companies from scraper/company-basic.json into the database';

    public function handle()
    {
        $path = base_path('../shared/company-basic.json');

        if (!file_exists($path)) {
            $this->error("❌ File not found at: $path");
            return 1;
        }

        $json = json_decode(file_get_contents($path), true);

        if (!is_array($json)) {
            $this->error("❌ Invalid JSON format.");
            return 1;
        }

        $count = 0;
        foreach ($json as $data) {
            if (!isset($data['name']) || trim($data['name']) === '') continue;

            $name = $data['name'];
            $address = $data['address'] ?? '';

            // ✅ Prevent duplicates
            $exists = Company::where('name', $name)
                ->where('address', $address)
                ->exists();

            if ($exists) continue;

            // ✅ Insert
            Company::create([
                'name'     => $name,
                'category' => $data['category'] ?? null,
                'address'  => $address,
                'phone'    => $data['phone'] ?? null,
                'website'  => $data['website'] ?? null,
                'city'     => $data['city'] ?? null,
            ]);

            $count++;
        }

        $this->info("✅ Imported $count companies successfully.");
        return 0;
    }
}
