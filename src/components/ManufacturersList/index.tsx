/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFetchAllManufacturers } from '../../actions/manufacturer.list.actions';
import { getManufacturerListArray } from '../../selectors/manufacturer.list.selector';
import { IndexRange, InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

export interface IManufacturerListPageProps {}

const ManufacturerListPage = (props: IManufacturerListPageProps) => {
    
    const dispatch = useDispatch();
    const manufacturers = useSelector(getManufacturerListArray);

    React.useEffect(() => {
        if (!manufacturers) {
            dispatch(getFetchAllManufacturers(1));
        }
    }, [
        manufacturers
    ]);
    
    const isRowLoaded = (d: any): boolean => {
        return manufacturers ? !!manufacturers[d.index] : false;
    }
      
    const loadMoreRows = (d: IndexRange) => {
        console.log('loadMoreRows', d);
        dispatch(getFetchAllManufacturers(1));
    //   return manufacturers;
    return new Promise((res, rej) => {
        console.log('loadMoreRows', d);
        res();
    });
    }
      
    const rowRenderer = (d: { key: string, index: number, style: any}) => {
        if (manufacturers) {
            return (
                <Grid container key={d.key} style={d.style}>
                    <Grid item xs={3}>
                        { manufacturers[d.index].id}
                    </Grid>
                    <Grid item xs={3}>
                        { manufacturers[d.index].name}
                    </Grid>
                    <Grid item xs={3}>
                        { manufacturers[d.index].country}
                    </Grid>
                    <Grid item xs={3}>
                        <Link to={`/manufacturer-details/${manufacturers[d.index].name}`}>
                            <Button
                                color="primary"
                            >
                                Details
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            )
        } else {
            return <div key="no-data">No Data</div>
        }
    }

    return (
        <Grid container justify="center" alignItems="center" spacing={4}>
            <Grid item>
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreRows}
                    rowCount={manufacturers?.length}
                >
                    {(data: { onRowsRendered: any, registerChild: any }) => (
                    <List
                        height={800}
                        onRowsRendered={data.onRowsRendered}
                        ref={data.registerChild}
                        rowCount={manufacturers?.length || 0}
                        rowHeight={50}
                        rowRenderer={rowRenderer}
                        width={800}
                    />
                    )}
                </InfiniteLoader>
            </Grid>
        </Grid>
    )
}

export default ManufacturerListPage;