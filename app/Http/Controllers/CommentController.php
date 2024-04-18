<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Post $post, Request $request)
    {
        $request->validate([
            'comment' => 'required|max:255',
        ]);

        $post->comments()->create([
            'user_id' => auth()->id(),
            'body' => $request->input('comment'),
        ]);

        return back();
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return back();
    }
}
