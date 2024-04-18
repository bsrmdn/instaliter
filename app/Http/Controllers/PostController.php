<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Home', [
            'posts' => fn () => Post::all(),
            'users' => fn () => User::all(['name', 'username'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return dd('$request: ', $request);
        $validatedData = $request->validate([
            'image' => 'image|file|required',
            'caption' => 'string|required'
        ]);

        if ($request->file('image')) {
            $validatedData['image'] = $request->file('image')->store('post-images');
        }

        $validatedData['user_id'] = auth()->user()->id;

        Post::create($validatedData);
        return back()->with(['message' => 'Create post successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        // return Inertia::
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validatedData = $request->validate([
            'image' => 'nullable|image|file',
            'caption' => 'nullable|string'
        ]);

        if ($request->file('image'))
            $validatedData['image'] = $request->file('image')->store('post-images');
        else
            $validatedData['image'] = $post->image;


        if (is_null($request->input('caption')))
            $validatedData['caption'] = $post->caption;

        // $validatedData['user_id'] = auth()->user()->id;
        // return dd($validatedData);

        Post::where('id', $post->id)->update($validatedData);
        return back()->with(['message' => 'Update post successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return back()->with(['message' => 'Delete post successfully!']);
    }
}
