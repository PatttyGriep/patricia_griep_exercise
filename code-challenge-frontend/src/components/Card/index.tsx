import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {Teams, UserData} from 'types';
import {Container, Tag} from './styles';

interface Props {
    id?: string;
    url?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: UserData | Teams;
    fullWidth?: boolean;
}

const Card = ({
    id,
    columns,
    url,
    hasNavigation = true,
    navigationProps = null,
    fullWidth = false,
}: Props): JSX.Element => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (hasNavigation) {
            navigate(url, {
                state: navigationProps,
            });
        }
    };

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={handleClick}
            style={{
                width: fullWidth ? '30%' : 'auto',
                textAlign: fullWidth ? 'center' : 'left',
                display: fullWidth ? 'flex' : 'block',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: fullWidth ? '1.2em' : '1em',
                cursor: hasNavigation ? 'pointer' : 'default',
            }}
        >
            {columns.map(({key: columnKey, value}) => (
                <div key={columnKey}>
                    {columnKey === 'Team Lead' && fullWidth ? (
                        <Tag>{value}</Tag>
                    ) : (
                        <React.Fragment>
                            <strong>{columnKey}</strong>&nbsp;{value}
                        </React.Fragment>
                    )}
                </div>
            ))}
        </Container>
    );
};

export default Card;
