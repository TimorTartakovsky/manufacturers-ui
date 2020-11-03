/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFetchAllManufacturers } from '../../actions/manufacturer.list.actions';
import {
    getManufacturerListArray, getManufacturerCurrentPage
} from '../../selectors/manufacturer.list.selector';
import {
    IndexRange, InfiniteLoader, List, AutoSizer, InfiniteLoaderChildProps, Index, ListRowProps,
} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getManufacturerDetailsByName } from '../../actions/manufacturer.detail.actions';

export interface IManufacturerListPageProps {}

const ManufacturerListPage = (props: IManufacturerListPageProps) => {
    
    const dispatch = useDispatch();
    const manufacturers = useSelector(getManufacturerListArray);
    const currentPage = useSelector(getManufacturerCurrentPage);
    const totalManufacturers = manufacturers?.length;
    const totalLimit = totalManufacturers ? (totalManufacturers - 20) : 0;

    React.useEffect(() => {
        if (!manufacturers) {
            dispatch(getFetchAllManufacturers(1));
        }
    }, [
        manufacturers
    ]);
    
    const isRowLoaded = (d: Index): boolean => {
        return manufacturers ? !!manufacturers[d.index] : false;
    }
      
    const loadMoreRows = (d: IndexRange) => {
        return new Promise((res, rej) => { res(d); });
    }
      
    const rowRenderer = (d: ListRowProps) => {
        if ((d.index === totalLimit) && d.isVisible) {
            dispatch(getFetchAllManufacturers(currentPage + 1));
        } else if (d.index === 0 && d.isVisible && currentPage > 1) {
            dispatch(getFetchAllManufacturers(1));
        }
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
                                onClick={() => {
                                    dispatch(getManufacturerDetailsByName(manufacturers[d.index].name))
                                }}
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
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={3}>ID</Grid>
                    <Grid item xs={3}>COMMON NAME</Grid>
                    <Grid item xs={3}>COUNTRY</Grid>
                    <Grid item xs={3}>DETAILS</Grid>
                </Grid>
                <div style={{ width: '70vw', height: '80vh'}}>
                    <AutoSizer>
                        {
                            (d: { width: number, height: number }) => (
                                <InfiniteLoader
                                    isRowLoaded={isRowLoaded}
                                    loadMoreRows={loadMoreRows}
                                    rowCount={manufacturers?.length}
                                >
                                    {(data: InfiniteLoaderChildProps) => (
                                        <List
                                            height={d.height}
                                            onRowsRendered={data.onRowsRendered}
                                            ref={data.registerChild}
                                            rowCount={manufacturers?.length || 0}
                                            rowHeight={35}
                                            rowRenderer={rowRenderer}
                                            width={d.width}
                                        />
                                    )}
                                </InfiniteLoader>
                            )
                        }
                    </AutoSizer>
                </div>
            </Grid>
        </Grid>
    )
}

export default ManufacturerListPage;