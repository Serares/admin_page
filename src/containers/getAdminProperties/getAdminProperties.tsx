import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useRouteMatch } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BASE_IMAGE_URL } from '../../utils/environment';
import PropertiesServiece from '../../services/Properties';
import { EPropertyTypes } from '../../interfaces/EPropertyTypes';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

//@ts-ignore
export default function GetAdminProperties() {
    const classes = useStyles();
    const history = useHistory();
    const { url } = useRouteMatch();

    const [properties, setProperties] = useState([]);
    // TODO remove ts ignore

    useEffect(() => {
        PropertiesServiece.getAll()
            .then(data => {
                setProperties(data.data);
            })
            .catch(err => {
                alert(err);
            })
    }, []);

    const humanizePropertyType = (type: string) => {
        let str = "";
        switch (Number(type)) {
            case (EPropertyTypes.APARTMENT):
                str = "apartment";
                break;
            case (EPropertyTypes.HOUSE):
                str = "house";
                break;
            case (EPropertyTypes.LANDANDCOMMERCIAL):
                str = "land";
                break;
        }

        return str;
    }

    function sendToPropertyDetails(propertyType: string, shortId: string) {
        history.push(`${url}/${humanizePropertyType(propertyType)}/${shortId}`);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Proprietati incarcate de administrator
            </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {properties.map((property: any) => (
                            <Grid item key={property.shortId} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={BASE_IMAGE_URL(property.thumbnail)}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Titlu:
                                            {property.title}
                                        </Typography>
                                        <Typography>
                                            Adresa:
                                            {property.address}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => { sendToPropertyDetails(property.propertyType, property.shortId) }} size="small" color="primary">
                                            View
                    </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}
