# Before the workshop — please set this up

**Workshop:** Spec-First Vibe Coding
**When:** 8:00 AM – 12:00 PM
**Time needed:** about 30 minutes, ideally two or three days before

Please do this **before** you arrive. We check it together at 8:07 and there's no install time inside the labs. If something doesn't work, message me before the day — not on the morning.

---

## What you're installing and why

Last session you built a prototype by chatting with AI Studio. This session works on a **project folder** instead of a single chat, because the spec, the build, the mock data and the video assets all need to sit together where a tool can read all of them at once.

- **Antigravity** — a code editor with an AI agent built in. You will not be writing code in it. You'll be typing instructions and reviewing what it produces.
- **Spec Kit** — adds a set of `/speckit.` commands to Antigravity that walk you through writing a specification and then building from it.

---

## Step 1 — Install Antigravity

Download from **antigravity.google** and sign in with your Google account.

Open it once and let it finish any first-run setup. That's all.

---

## Step 2 — Install the prerequisites

Spec Kit needs three things present first: **Git**, **Python 3.11 or newer**, and **uv**.

**Check what you already have.** Open a terminal (on Windows, use PowerShell; on Mac, use Terminal) and run:

```bash
git --version
python3 --version
```

If either is missing, install it — Git from **git-scm.com**, Python from **python.org**.

**Then install uv:**

macOS / Linux
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Windows (PowerShell)
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Close and reopen your terminal afterwards, then check it worked:

```bash
uv --version
```

---

## Step 3 — Install Spec Kit

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

Install it from that GitHub address, not from PyPI — packages with similar names there are not the official ones.

Confirm it's working:

```bash
specify check
```

---

## Step 4 — Create a test project

```bash
specify init test-app --integration agy
specify integration status
```

`agy` is the integration key for Antigravity. If your version rejects `--integration`, you have an older release — use `--ai agy` instead, and tell me.

---

## Step 5 — Install Node.js and FFmpeg (for the video lab)

The afternoon's video tool, HyperFrames, renders on your own machine and needs two things:

- **Node.js 22 or newer** — from **nodejs.org**, take the LTS version
- **FFmpeg** — from **ffmpeg.org**, or on Mac with Homebrew: `brew install ffmpeg`

Check both:

```bash
node --version    # must be v22 or higher
ffmpeg -version
```

No HeyGen account is needed. Rendering happens locally.

---

## Step 6 — The test that actually matters

1. Open the **test-app** folder in Antigravity — use *File → Open Folder*, and open the folder itself, not a file inside it.
2. In the agent chat, type `/speckit.`
3. You should see commands autocomplete — `/speckit.constitution`, `/speckit.specify`, `/speckit.plan` and others.

**If those commands appear, you're done.** That's the green light we're checking at 8:07.

---

## Also bring

- Your **design language** from last session — the prompt or document describing colours, fonts and style.
- Your **prototype HTML file** from AI Studio.
- Your laptop charger. It's a four-hour session.

---

## If you get stuck

Send me a screenshot of the terminal showing the error, plus your operating system. Don't spend more than about 30 minutes fighting it on your own.

And to be clear: **if your setup isn't working on the day, you can still do every lab.** There's a no-tooling version of each one that produces exactly the same files. You'd just be doing by hand what the tool automates. Nobody misses out.

— Lay Keanghok · Laykeanghok@gmail.com
