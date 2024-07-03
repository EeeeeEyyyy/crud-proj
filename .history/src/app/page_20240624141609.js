"use client"

Build Error
Failed to compile

Next.js (14.2.4)
./src/app/page.js
Error: 
  × You're importing a component that needs useEffect. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
  │ Learn more: https://nextjs.org/docs/getting-started/react-essentials
  │ 
  │ 
   ╭─[C:\Users\ADMIN\OneDrive\Desktop\AP GLOBAL IT SOLUTION - COLDURA\DAY 13\crud-proj\src\app\page.js:1:1]
 1 │ import React, { useEffect, useState } from 'react';
   ·                 ─────────
 2 │ import axios from 'axios';
 3 │ import styles from './page.module.css';
   ╰────

  × You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
  │ Learn more: https://nextjs.org/docs/getting-started/react-essentials
  │ 
  │ 
   ╭─[C:\Users\ADMIN\OneDrive\Desktop\AP GLOBAL IT SOLUTION - COLDURA\DAY 13\crud-proj\src\app\page.js:1:1]
 1 │ import React, { useEffect, useState } from 'react';
   ·                            ────────
 2 │ import axios from 'axios';
 3 │ import styles from './page.module.css';
   ╰────

Import trace for requested module:
./src/app/page.js