import { ReactElement, FunctionComponent, ReactNode, FC } from 'react';

export type LayoutProps = {
    children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <header>Header</header>
            <main>{children}</main>
            <footer>Footer</footer>
        </>
    );
};
