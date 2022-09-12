<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Book::factory(150)->create();
        // Laravel manier
        // $users = User::All();
        // $categories = Category::All();

        // $books = Book::factory(150)->create();
        // ->hasAttached($users)->hasAttached($categories)->create();

        // // Fancy manier
        // $categoryCount = Category::count();
        // $userCount = User::count();

        // $books->each(function (Book $book) use ($categoryCount) {
        //     for ($i = 0; $i < rand(1, $categoryCount); $i++) {
        //         $book->categories()->syncWithoutDetaching(rand(1, $categoryCount));
        //     }
        // });

        // $books->each(function (Book $book) use ($userCount) {
        //     for ($i = 0; $i < rand(1, $userCount); $i++) {
        //         $book->users()->syncWithoutDetaching(rand(1, $userCount));
        //     }
        // });
    }
}
