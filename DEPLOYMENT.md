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

Add these **Production** environment variables in Vercel. The public site, API, and Django admin all use the same domain, so `NEXT_PUBLIC_API_URL` and `DJANGO_BACKEND_URL` must remain unset.

```text
DEBUG=False
SECRET_KEY=<long-random-secret>
DATABASE_URL=<postgres-connection-string>
ALLOWED_HOSTS=encounterchrist.online,www.encounterchrist.online,.vercel.app
CORS_ALLOWED_ORIGINS=https://encounterchrist.online,https://www.encounterchrist.online,https://encounter-christ.vercel.app
CSRF_TRUSTED_ORIGINS=https://encounterchrist.online,https://www.encounterchrist.online,https://encounter-christ.vercel.app
NEXT_PUBLIC_SITE_URL=https://encounterchrist.online
```

Optional Cloudinary variables are needed if the admin uploads media:

```text
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
```

Every environment-variable change requires a new deployment. The site falls back to `https://encounterchrist.online` for canonical metadata, but setting `NEXT_PUBLIC_SITE_URL` explicitly keeps the configuration clear and portable.

## 3. Connect `encounterchrist.online`

1. In Vercel, open the project, then **Settings → Domains → Add Domain**. Add `encounterchrist.online`, and also add `www.encounterchrist.online`.
2. Make `encounterchrist.online` the primary domain. Configure the `www` domain to redirect to it.
3. In Hostinger hPanel, open **Domains → encounterchrist.online → DNS / Nameservers → DNS records**. Remove only conflicting website records for `@` and `www` (do not remove MX/TXT email records), then add the exact records Vercel displays. Normally these are:

   ```text
   Type    Name    Value
   A       @       76.76.21.21
   CNAME   www     cname.vercel-dns-0.com
   ```

   Vercel may display a project-specific CNAME value; that value takes precedence over this general example. Keep Hostinger nameservers unless you intentionally move all DNS management, including email records, to Vercel.
4. Wait for Vercel to report the domains as valid and SSL as issued, then redeploy the production deployment after saving the variables above.

After the first deployment, verify:

- `https://encounterchrist.online/`
- `https://encounterchrist.online/api/miracles/`
- `https://encounterchrist.online/admin/`

The `/admin/` URL is the Django admin panel and remains protected by its normal superuser login. The Vercel domain continues to work as a deployment URL, but the custom domain is the canonical public URL.

## GitHub and Vercel CLI

Push the complete repository to GitHub, then either import it in the Vercel
dashboard or deploy from the repository root:

```powershell
vercel
```

Set environment variables in the Vercel dashboard or with `vercel env add`.
