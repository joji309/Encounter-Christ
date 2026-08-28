# Vercel deployment

Deploy the repository as one Vercel project from the repository root. Next.js
serves the public site and the root `api/index.py` function serves Django on the
same domain. Vercel's serverless filesystem is ephemeral, so production Django
must use hosted PostgreSQL rather than the local SQLite file.

## 1. Create the database

Create a PostgreSQL database with Neon, Vercel Postgres, Supabase, or another
provider. Keep its connection string ready as `DATABASE_URL`. Run migrations
locally against it from the `backend` directory:

```powershell
python manage.py migrate
python manage.py createsuperuser
```

Run `python manage.py seed_data` too if the production database needs the sample
content.

## 2. Create the Vercel project

Import `https://github.com/joji309/Encounter-Christ.git` as one project with:

- Root Directory: `.`
- Framework Preset: Next.js
- Install Command: `npm --prefix frontend ci`
- Build Command: `npm --prefix frontend run build`
- Output Directory: leave the default

The root `vercel.json` routes `/api`, `/admin`, `/static`, and `/media` to
`api/index.py`. The root `requirements.txt` supplies Django's Python
dependencies. Do not configure `backend` as a second Vercel project.

Add these Production environment variables:

```text
DEBUG=False
SECRET_KEY=<long-random-secret>
DATABASE_URL=<postgres-connection-string>
ALLOWED_HOSTS=.vercel.app
NEXT_FRONTEND_URL=https://<project>.vercel.app
CORS_ALLOWED_ORIGINS=https://<project>.vercel.app
CSRF_TRUSTED_ORIGINS=https://<project>.vercel.app
```

Optional Cloudinary variables are needed if the admin uploads media. After the
`NEXT_PUBLIC_API_URL` is not required because the frontend uses same-origin
`/api` requests. `DJANGO_BACKEND_URL` is also not required for this single-
project deployment.

After the first deployment, verify:

- `https://<project>.vercel.app/`
- `https://<project>.vercel.app/api/miracles/`
- `https://<project>.vercel.app/admin/`

Set `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` to the final custom domain
as well if you add one.

## GitHub and Vercel CLI

Push the complete repository to GitHub, then either import it in the Vercel
dashboard or deploy from the repository root:

```powershell
vercel
```

Set environment variables in the Vercel dashboard or with `vercel env add`.