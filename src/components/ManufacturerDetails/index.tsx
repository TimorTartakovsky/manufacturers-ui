import React from 'react';
import * as H from 'history';
import { IManufacturerDetailsItem } from '../../store/manufacturer.detail.reducer';
import { useSelector } from 'react-redux';
import { getManufacturerDetailsArray } from '../../selectors/manufacturer.detail.selector';
import {
    IndexRange, InfiniteLoader, List, AutoSizer, InfiniteLoaderChildProps, Index, ListRowProps,
} from 'react-virtualized';
import { Grid, Typography } from '@material-ui/core';

export interface IDetailsItem {
    [k: string]: IManufacturerDetailsItem,
}

export interface IManufacturerEditPageProps {
    history: H.History,
    location: H.Location,
    match: any,
}

const ManufacturerDetailsPage = (props: IManufacturerEditPageProps) => {

    const details = useSelector(getManufacturerDetailsArray);
    
    const isRowLoaded = (d: Index): boolean => {
        return details ? !!details[d.index] : false;
    }
      
    const loadMoreRows = (d: IndexRange) => {
        return new Promise((res, rej) => { res(d); });
    }
      
    const rowRenderer = (d: ListRowProps) => {
        if (details) {
            return (
                <Grid container key={d.key} style={d.style}>
                    <Grid item xs={4}>
                        <Typography variant="caption">
                            { details[d.index].makeNames}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="caption">
                            { details[d.index].mopdelNames}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="caption">
                            { details[d.index].manufaturers}
                        </Typography>
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
                    <Grid item xs={4}>MANUFACTURER</Grid>
                    <Grid item xs={4}>MODEL NAMES</Grid>
                    <Grid item xs={4}>MAKES</Grid>
                </Grid>
                <div style={{ width: '60vw', height: '80vh'}}>
                    <AutoSizer>
                        {
                            (d: { width: number, height: number }) => (
                                <InfiniteLoader
                                    isRowLoaded={isRowLoaded}
                                    loadMoreRows={loadMoreRows}
                                    rowCount={details?.length}
                                >
                                    {(data: InfiniteLoaderChildProps) => (
                                        <List
                                            height={d.height}
                                            onRowsRendered={data.onRowsRendered}
                                            ref={data.registerChild}
                                            rowCount={details?.length || 0}
                                            rowHeight={(i: Index) => {
                                                if(!details || !details.length) {
                                                    return 0;
                                                }
                                                const elem: IManufacturerDetailsItem = details[i.index];
                                                const max = (elem.manufaturers.length > elem.mopdelNames.length) ?
                                                    (elem.manufaturers.length / 2) : (elem.mopdelNames.length / 2);
                                                return (max < 100) ? 100 : max;
                                            }}
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

export default ManufacturerDetailsPage;