import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';

import { _add } from '@utils/helpers/add';
import { Box } from '@chakra-ui/react';

interface Breadcrumb {
  breadcrumb: string;
  href: string;
}

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb> | null>(
    null
  );

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/')
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="breadcrumbs">
      <ol>
        <Box
          textColor="brand.100"
          as="li"
          display="inline-flex"
          alignItems="center"
        >
          <Link href="/">
            <a>home</a>
          </Link>
          <Icon
            height="20px"
            width="20px"
            icon="bx:bx-chevron-right"
            style={{ marginInline: '8px' }}
          />
        </Box>
        {breadcrumbs.length >= 1 &&
          breadcrumbs.map((breadcrumb, i) => {
            if (!breadcrumb || breadcrumb.breadcrumb.length === 0) {
              return null;
            } else {
              const isLastChild = breadcrumbs.length === _add(i, 1);

              return (
                <Box
                  textColor="brand.100"
                  as="li"
                  display="inline-flex"
                  alignItems="center"
                  key={i}
                >
                  <Link href={breadcrumb.href}>
                    <a>{breadcrumb.breadcrumb}</a>
                  </Link>
                  {!isLastChild && (
                    <Icon
                      height="20px"
                      width="20px"
                      icon="bx:bx-chevron-right"
                      style={{ marginInline: '8px' }}
                    />
                  )}
                </Box>
              );
            }
          })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
