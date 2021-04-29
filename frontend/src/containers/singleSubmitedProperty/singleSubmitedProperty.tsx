import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SubmitedPropertiesStore } from '../../store/submitedProperties';
import { useParams } from 'react-router-dom';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
import Carousel from '../../components/Carousel/Carousel';
//@ts-ignore
import classes from './index.module.css';
import propertyTypeValues from '../../utils/propertyTypeValues';
import transactionTypeValues from '../../utils/transactionTypeValues';

export default function SingleSubmitedProperty() {
    //@ts-ignore
    const { shortId } = useParams();
    const history = useHistory();
    // TODO take out ts-ignore add getSingleProperty to type definition
    //@ts-ignore
    const { singleProperty, getSingleProperty, deleteSingleProperty } = useContext(SubmitedPropertiesStore);

    useEffect(() => {
        getSingleProperty(shortId);
    }, []);

    const handleDeleteProperty = (shortId: string, gcsSubfolderId: string) => {
        deleteSingleProperty(shortId, gcsSubfolderId)
            .then(() => {
                history.goBack();
            })
            .catch((err: any) => {
                //TODO
                alert("Error deleting property")
            })
    };

    return (
        <main>
            {/* TODO implement loading spinner */}
            {Object.keys(singleProperty).length > 0 &&
                (<div>
                    <div>
                        {singleProperty.imagesUrls && <Carousel imagesUrls={singleProperty.imagesUrls} />}
                    </div>
                    <div className={classes.InformationContainer}>
                        {/* Submited Property Information */}
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Paper className={classes.Paper}>
                                    <Typography variant="h5">
                                        Titlu: {singleProperty.title}
                                        <p>ID: {singleProperty.shortId}</p>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper className={classes.Paper}>
                                    <Typography variant="h5">
                                        Proprietatea este : {propertyTypeValues(singleProperty.propertyType)}
                                        <p>pentru: {transactionTypeValues(singleProperty.transactionType)}</p>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper className={classes.Paper}>
                                    <Typography variant="h5">
                                        <p>Pret:</p>
                                        {singleProperty.price} EUR
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper className={classes.Paper}>
                                    <Typography variant="h6">
                                        <p>Proprietatea postata de : {singleProperty.postedBy.name}</p>
                                        <p>Email : {singleProperty.postedBy.email}</p>
                                        <p>Telefon : {singleProperty.postedBy.phoneNumber}</p>
                                        <p>ID:  {singleProperty.postedBy.shortId}</p>
                                    </Typography>
                                </Paper>
                            </Grid>
                            {/* land has no rooms */}
                            {singleProperty.rooms && <Grid item xs={12} md={6}>
                                <Paper className={classes.Paper}>
                                    <Typography variant="h5">
                                        <p>Camere:</p>
                                        {singleProperty.rooms}
                                    </Typography>
                                </Paper>
                            </Grid>}
                            <Grid item xs={12} md={6}>
                                <Paper className={classes.Paper}>
                                    <Typography variant="h5">
                                        <p>Detalii:</p>
                                        {singleProperty.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper className={classes.Paper}>
                                    <Typography variant="h5">
                                        <p>Adresa:</p>
                                        {singleProperty.address}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper className={classes.Paper}>
                                    <Typography variant="h5">
                                        <p>Suprafata:</p>
                                        {singleProperty.surface} m<sup>2</sup>
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Paper className={classes.Paper}>
                                    <Button onClick={() => { handleDeleteProperty(singleProperty.shortId, singleProperty.gcsSubfolderId) }} variant="contained" color="secondary">
                                        Sterge
                                    </Button>
                                </Paper>
                            </Grid>

                        </Grid>
                    </div>
                </div>)
            }
        </main >
    );

}