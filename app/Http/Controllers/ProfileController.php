<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        return Inertia::render('Profile/Profile', [
            'user' => $user,
            'posts' => Post::byUser($user->id)->get(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        if ($user->id == Auth::id())
            return redirect(route('profile'));

        return Inertia::render('Profile/Profile', [
            'user' => $user,
            'posts' => Post::byUser($user->id)->get(),
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function update_avatar(Request $request)
    {
        if ($request->user()->avatar != 'avatars/default-profile.jpg')
            Storage::delete($request->user()->avatar);

        $request->user()->fill(['avatar' => $request->file('avatar')->store('avatars')]);
        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function destroy_avatar(Request $request)
    {
        if ($request->user()->avatar != 'avatars/default-profile.jpg') {
            Storage::delete($request->user()->avatar);
            $request->user()->fill(['avatar' => 'avatars/default-profile.jpg']);
            $request->user()->save();
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
