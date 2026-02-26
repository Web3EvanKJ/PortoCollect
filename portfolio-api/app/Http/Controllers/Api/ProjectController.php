<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{

    use AuthorizesRequests;

    public function index()
    {
        $projects = Project::with('category')
            ->published()
            ->when(request('category'), function ($query) {
                $query->whereHas('category', function ($q) {
                    $q->where('slug', request('category'));
                });
            })
            ->latest()
            ->paginate(10);

        return ProjectResource::collection($projects);
    }

    public function show(Project $project)
    {
        abort_unless($project->is_published, 404);

        return new ProjectResource($project->load('category'));
    }

    public function store(StoreProjectRequest $request)
    {
        $project = $request->user()->projects()->create([
            ...$request->validated(),
            'slug' => Str::slug($request->title)
        ]);

        return new ProjectResource($project);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $this->authorize('update', $project);

        $project->update($request->validated());

        return new ProjectResource($project);
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);

        $project->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
