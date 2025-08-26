import { Link } from '@inertiajs/react';
type ActionProps = React.ComponentProps<typeof Link>;
export const Action = ({ action, data, children, ...props }: ActionProps & { action: string; data: Record<string, any> }) => {
    return (
        <Link
            method="post"
            as="button"
            href="/actions"
            data={{
                ...data,
                action: action,
            }}
            {...props}
        >
            {children}
        </Link>
    );
};
