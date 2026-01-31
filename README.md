# Firebase Studio Project

This is a Next.js starter project created in Firebase Studio.

To get started, take a look at `src/app/page.tsx`.

---

## How to Push Your Code to GitHub

Follow these steps to push your Firebase Studio project to your GitHub repository.

**Target Repository:** `https://github.com/mikomike254/eddjoys`

### Step-by-step Commands

**1. Navigate to your project root directory**

Make sure you are in the correct folder. Open your terminal and run `ls` (or `dir` on Windows) to check for your project files.

```sh
ls
```

You should see files and folders like:
- `package.json`
- `src`
- `next.config.ts`

If not, `cd` into the correct project folder first.

**2. Initialize Git**

If you haven't already, initialize a new Git repository.

```sh
git init
```

**3. Add all files to staging**

```sh
git add .
```

**4. Create your first commit**

This saves a snapshot of your project to Git's history.

```sh
git commit -m "Initial commit from Firebase Studio"
```

**5. Add your GitHub repository as a remote**

This links your local repository to the one on GitHub.

```sh
git remote add origin https://github.com/mikomike254/eddjoys.git
```

**6. Push your code to GitHub**

This uploads your files.

```sh
# Ensure your main branch is called 'main'
git branch -M main

# Push the 'main' branch to your 'origin' remote
git push -u origin main
```

---

### Authentication with GitHub

If GitHub prompts you for a username and password in the terminal:

-   **Username:** `mikomike254`
-   **Password:** **Do NOT use your GitHub password.** You must use a **Personal Access Token (PAT)**.

#### How to create a Personal Access Token:

1.  Go to [**github.com/settings/tokens/new**](https://github.com/settings/tokens/new)
2.  Give your token a descriptive name (e.g., "Firebase Studio CLI").
3.  Set an expiration date.
4.  Under **"Repository access"**, select the **`repo`** scope. This will grant it full control of private repositories.
5.  Click **"Generate token"**.
6.  **Important:** Copy the generated token immediately. You won't be able to see it again.
7.  Paste this token when your terminal asks for a password.

### Success Check

After pushing, go to your repository URL to confirm your files are there:
[https://github.com/mikomike254/eddjoys](https://github.com/mikomike254/eddjoys)

You should see all your project files, the "Initial commit..." message, and a `main` branch.
