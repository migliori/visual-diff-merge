<?php

namespace VisualDiffMerge\UserManagement;

/**
 * Enhanced User Management System
 * Advanced user operations with security improvements
 */
class UserManager
{
    private $users = [];
    private $loginAttempts = [];
    private $maxLoginAttempts = 3;

    public function __construct()
    {
        $this->users = [];
        $this->loginAttempts = [];
    }

    /**
     * Add a new user to the system with validation
     */
    public function addUser($username, $email, $password, $role = 'user')
    {
        if ($this->userExists($username)) {
            throw new \Exception("User already exists");
        }

        if (!$this->validateEmail($email)) {
            throw new \Exception("Invalid email format");
        }

        if (!$this->validatePassword($password)) {
            throw new \Exception("Password must be at least 8 characters long");
        }

        $user = [
            'id' => uniqid(),
            'username' => $username,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_BCRYPT),
            'role' => $role,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'status' => 'active',
            'last_login' => null
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
     * Authenticate user with rate limiting
     */
    public function authenticate($username, $password)
    {
        if ($this->isAccountLocked($username)) {
            throw new \Exception("Account temporarily locked due to multiple failed attempts");
        }

        $user = $this->getUser($username);
        if ($user && password_verify($password, $user['password'])) {
            $this->resetLoginAttempts($username);
            $this->updateLastLogin($username);
            return true;
        }

        $this->recordFailedAttempt($username);
        return false;
    }

    /**
     * Validate email format
     */
    private function validateEmail($email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * Validate password strength
     */
    private function validatePassword($password)
    {
        return strlen($password) >= 8;
    }

    /**
     * Check if account is locked
     */
    private function isAccountLocked($username)
    {
        $attempts = $this->loginAttempts[$username] ?? 0;
        return $attempts >= $this->maxLoginAttempts;
    }

    /**
     * Record failed login attempt
     */
    private function recordFailedAttempt($username)
    {
        $this->loginAttempts[$username] = ($this->loginAttempts[$username] ?? 0) + 1;
    }

    /**
     * Reset login attempts
     */
    private function resetLoginAttempts($username)
    {
        unset($this->loginAttempts[$username]);
    }

    /**
     * Update last login timestamp
     */
    private function updateLastLogin($username)
    {
        foreach ($this->users as &$user) {
            if ($user['username'] === $username) {
                $user['last_login'] = date('Y-m-d H:i:s');
                break;
            }
        }
    }

    /**
     * Get all users (excluding passwords)
     */
    public function getAllUsers()
    {
        $safeUsers = [];
        foreach ($this->users as $user) {
            $safeUser = $user;
            unset($safeUser['password']);
            $safeUsers[] = $safeUser;
        }
        return $safeUsers;
    }

    /**
     * Update user information
     */
    public function updateUser($username, $data)
    {
        foreach ($this->users as &$user) {
            if ($user['username'] === $username) {
                if (isset($data['email']) && $this->validateEmail($data['email'])) {
                    $user['email'] = $data['email'];
                }
                if (isset($data['role'])) {
                    $user['role'] = $data['role'];
                }
                if (isset($data['status'])) {
                    $user['status'] = $data['status'];
                }
                $user['updated_at'] = date('Y-m-d H:i:s');
                return true;
            }
        }
        return false;
    }

    /**
     * Delete user
     */
    public function deleteUser($username)
    {
        foreach ($this->users as $key => $user) {
            if ($user['username'] === $username) {
                unset($this->users[$key]);
                unset($this->loginAttempts[$username]);
                return true;
            }
        }
        return false;
    }

    /**
     * Get user statistics
     */
    public function getUserStats()
    {
        $stats = [
            'total_users' => count($this->users),
            'active_users' => 0,
            'inactive_users' => 0,
            'locked_accounts' => count($this->loginAttempts)
        ];

        foreach ($this->users as $user) {
            if ($user['status'] === 'active') {
                $stats['active_users']++;
            } else {
                $stats['inactive_users']++;
            }
        }

        return $stats;
    }
}
