<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'tech_stack' => $this->tech_stack,
            'category_id' => $this->category_id,
            'category' => $this->category->name,
            'user_id' => $this->user_id,
            'user_name' => $this->user->name,
            'github_url' => $this->github_url,
            'live_url' => $this->live_url,
            'is_published' => $this->is_published,
            'created_at' => $this->created_at
        ];
    }
}
