# Production image manifest

The JPEG originals in `pictures/` were kept intact. The site uses WebP copies from `public/images/`. The three documents were rotated upright and cropped around the paper to retain their text.

| Original | Source dimensions and size | Production copy | Use |
| --- | --- | --- | --- |
| `pictures/pratham.jpeg` | 720 × 1280, portrait, 84,195 bytes | `public/images/profile/pratham-casual.webp` | About portrait |
| `pictures/pratham2.jpeg` | Portrait | `public/images/profile/pratham-portrait.webp` | Hero portrait |
| `pictures/certificate1.jpeg` | 899 × 1599, sideways landscape document, 85,681 bytes | `public/images/certificates/green-olympiad-merit.webp` | GREEN Olympiad, Certificate of Merit, TERI, 2024–25 edition |
| `pictures/certificate2.jpeg` | 900 × 1600, sideways landscape document, 97,925 bytes | `public/images/certificates/firewall-ctf-participation.webp` | Firewall Capture the Flag, Certificate of Participation, Kristu Jayanti Institute of Technology, 28 August 2026 |
| `pictures/certificate3.jpeg` | 900 × 1600, sideways landscape document, 131,575 bytes | `public/images/certificates/hackathon-3-participation.webp` | Hackathon 3.0 Solve for Society, Certificate of Excellence documenting participation, School of Computer Science and Applications at REVA University, 9 October 2026 |
| `pictures/hackathon.jpeg` | 1500 × 1000, landscape, 189,816 bytes | `public/images/hackathons/field-session.webp` | General hackathon field photograph. The exact event is unidentified. |

`src/data/assets.ts` supplies paths to the portrait, event photos, certificate archive, and project plates. Add future certificate images there with their true image dimensions and verified metadata. The project and event records in `src/data/profile.ts` contain their asset filenames. The README lists the expected paths for additional images.
