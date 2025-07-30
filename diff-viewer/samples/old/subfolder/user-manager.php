<?php

namespace VisualDiffMerge\UserManagement;

/**
 * User Management System
 * Basic user operations for a web application
 */
class UserManager
{
    private $users = [];

    public function __construct()
    {
        $this->users = [];
    }

    /**
     * Add a new user to the system
     */
    public function addUser($username, $email, $password)
    {
        if ($this->userExists($username)) {
            throw new \Exception("User already exists");
        }

        $user = [
            'id' => uniqid(),
            'username' => $username,
            'email' => $email,
            'password' => md5($password),
            'created_at' => date('Y-m-d H:i:s'),
            'status' => 'active'
        ];

        $this->users[] = $user;
        return $user['id'];
    }

    /**
     * Get user by username
     */
    public function getUser($username)
    {
        foreach ($this->users as $user) {
            if ($user['username'] === $username) {
                return $user;
            }
        }
        return null;
    }

    /**
     * Check if user exists
     */
    public function userExists($username)
    {
        return $this->getUser($username) !== null;
    }

    /**
     * Authenticate user
     */
    public function authenticate($username, $password)
    {
        $user = $this->getUser($username);
        if ($user && $user['password'] === md5($password)) {
            return true;
        }
        return false;
    }

    /**
     * Get all users
     */
    public function getAllUsers()
    {
        return $this->users;
    }

    /**
     * Delete user
     */
    public function deleteUser($username)
    {
        foreach ($this->users as $key => $user) {
            if ($user['username'] === $username) {
                unset($this->users[$key]);
                return true;
            }
        }
        return false;
    }
}
