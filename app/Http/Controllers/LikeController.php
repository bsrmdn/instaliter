<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Http\Requests\StoreLikeRequest;
use App\Http\Requests\UpdateLikeRequest;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{

    public function likePost(Request $request, Post $post)
    {
        $like = $request->user()->likes()->where('likeable_id', $post->id)->where('likeable_type', Post::class)->first();
        // return dd($like);

        if ($like) {
            $like->delete();
        } else {
            $request->user()->likes()->create([
                'likeable_id' => $post->id,
                'likeable_type' => Post::class,
            ]);
        }
    }

    // public function destroy(Like $like)
    // {
    //     $like->delete();

    //     return response()->json(['message' => 'Like deleted successfully']);
    // }
}
