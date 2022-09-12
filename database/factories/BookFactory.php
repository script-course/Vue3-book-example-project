<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'author_id' => $this->faker->numberBetween(1, 20),
            'title' => $this->faker->sentence(5, true),
            'image' => $this->faker->imageUrl(200, 200, 'sports'),
            'description' => $this->faker->text(200),
        ];
    }

    /**
     * Configure the factory
     *
     * @return
     */
    public function configure()
    {
        return $this->afterCreating(function (Book $book) {
            $book
                ->categories()
                ->attach(
                    Category::inRandomOrder()
                        ->take(rand(1, Category::count()))
                        ->pluck('id')
                );
            $book
                ->users()
                ->attach(
                    User::inRandomOrder()
                        ->take(rand(1, User::count()))
                        ->pluck('id')
                );
        });
    }
}
