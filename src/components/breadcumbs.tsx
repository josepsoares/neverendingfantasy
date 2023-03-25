import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Image } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

import { _add } from '@utils/helpers/math';

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

      // console.log('QUeRY =>', router.query, router.pathname, router.basePath);

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path.split('?')[0].replaceAll('-', ' '),
          href: '/' + linkPath.slice(0, i + 1).join('/')
        };
      });

      // console.log(pathArray);

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <>
      <Box
        as="header"
        display="flex"
        flexDir="row"
        flexWrap="wrap"
        alignItems="center"
        gap={[2, null, 4]}
      >
        <Link href="/">
          <Image
            borderRadius="4px"
            src="/favicons/favicon-32x32.png"
            alt="Neverendingfantsy logo"
          />
        </Link>
        <nav aria-label="breadcrumbs">
          <Box as="ol" flexWrap="wrap">
            <Box
              as="li"
              textColor="brand.100"
              display="inline-flex"
              alignItems="center"
              fontSize={['initial', 'large', '2xl']}
            >
              <Link href="/">home</Link>
              <Icon
                height="20px"
                width="20px"
                icon="bx:bx-chevron-right"
                style={{ marginInline: '8px' }}
              />
            </Box>
            {breadcrumbs.length >= 1 &&
              breadcrumbs.map((breadcrumb, i) => {
                // console.log(breadcrumb);
                if (!breadcrumb || breadcrumb.breadcrumb.length === 0) {
                  return null;
                } else {
                  const isLastChild = breadcrumbs.length === _add(i, 1);

                  return (
                    <Box
                      as="li"
                      key={i}
                      textColor="brand.100"
                      display="inline-flex"
                      alignItems="center"
                      fontSize={['initial', 'large', '2xl']}
                    >
                      <Link href={breadcrumb.href}>
                        {breadcrumb.breadcrumb}
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
          </Box>
        </nav>
      </Box>
    </>
  );
};

export default Breadcrumbs;
