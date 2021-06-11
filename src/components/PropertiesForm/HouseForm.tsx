import React, { FunctionComponent, useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { HouseStore } from '../../store/houseStore';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ApartmentIcon from '@material-ui/icons/Apartment';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import LeafletMap from '../../components/Map/Map';
import ImagesUpload from "../ImagesUpload/ImagesUpload";

const useStyles = makeStyles(theme => ({
    paper: {
        width: "90%",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    formControl: {
        minWidth: 120
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -9,
        marginLeft: -9,
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

type FormData = {
    title: string;
    description: string;
    address: string;
    price: string;
    //lng lat
    coords: number[];
    transactionType: number;
    isFeatured: boolean;
    features: {
        rooms: number;
    },
    utilities: {
        general: string[],
        heatingSystem: string[],
        conditioning: string[]
    },
    amenities: {
        building: string[]
    }
};

/** required for controlled select inputs  */
const defaultFormValues = {
    transactionType: ""
}
const schema = yup.object().shape({
    title: yup.string().required("Este nevoie de un titlu")
});

const HouseForm: FunctionComponent<any> = () => {

    const formHookValues = {
        title: "",
        description: "",
        address: "",
        price: "",
        transactionType: "",
        rooms: "",
        buildingType: "",
        comfort: "",
        usableArea: "",
        totalUsableArea: "",
        constructionYear: "",
        structure: ""
    }
    const classes = useStyles();
    //@ts-ignore
    const { shortId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    //@ts-ignore
    const { getPropertyInfo, onSub, handleGeneralUtilities, handleAmenities, setPropertyCoords, houseProperties,deletedImages, setUploadedImages, isModify, handleRemove } = useContext(HouseStore);
    const { uploadedImages } = houseProperties;
    const {
        handleSubmit,
        register,
        formState: { errors }, setValue } = useForm<any>({ resolver: yupResolver(schema), defaultValues: defaultFormValues });


    useEffect(() => {
        //TODO get features from db when on modify mode
        //TODO fill checkboxes on modify
        if (isModify && shortId) {
            setIsLoading(true);
            getPropertyInfo(shortId)
                .then((apartmentData: any) => {
                    Object.keys(formHookValues).forEach(value => {
                        setValue(value, apartmentData[value])
                    });
                })
                .catch((err: any) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        };
    }, []);


    const generateYears = () => {
        let max = 2020;
        let min = max - 80;

        let years = [];

        for (let i = max; i >= min; i--) {
            years.push(i);
        }

        return years;
    };

    const getMapCoords = (latLng: any) => {
        setPropertyCoords(latLng);
    };

    return (
        <React.Fragment>
            {isLoading ? "Loading" : <Container component="main" maxWidth="xl">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <ApartmentIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Adauga Casa
                </Typography>
                    <Paper className={classes.paper}>
                        <form
                            className={classes.form}
                            onSubmit={handleSubmit(onSub)}
                            noValidate
                        >

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <label>Titlul proprietatii: </label>
                                    <input className={`form-control`} {...register("title")} />
                                    <div className="invalid-feedback">{errors.title?.message}</div>
                                </Grid>
                                <Grid item xs={6}>
                                    <label>Adresa: </label>
                                    <input className={`form-control`} {...register("address")} />
                                    <div className="invalid-feedback">{errors.address?.message}</div>
                                </Grid>
                                <Grid item xs={6}>
                                    <label>Pretul EUR: </label>
                                    <input type="number" className={`form-control`} {...register("price")} />
                                    <div className="invalid-feedback">{errors.price?.message}</div>
                                </Grid>
                                <Grid item xs={12}>
                                    <label>Descriere proprietate</label>
                                    <textarea className="form-control" aria-label="With textarea" {...register("description")}></textarea>
                                    <div className="invalid-feedback">{errors.description?.message}</div>
                                </Grid>
                                <Grid item xs={6}>
                                    <label id={`select-`}>Tipul tranzactiei:</label>
                                    <select {...register("transactionType")} className="form-control" placeholder={"Tipul tranzactiei"}>
                                        {[{ value: 1, text: "Vanzare" }, { value: 2, text: "Chirie" }].map(item => <option key={item.value} value={item.value}>{item.text}</option>)}
                                    </select>
                                </Grid>
                                {/* Features */}
                                <Grid item xs={12}>
                                    <Typography color="primary">Caracteristici: </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <label id={`select-`}>Numar camere: </label>
                                            <select {...register("rooms")} className="form-control" placeholder={"Numar camere: "}>
                                                {[{ value: 1, text: "1" }, { value: 2, text: "2" }, { value: 3, text: "3" }, { value: 4, text: "4+" }].map(item => <option key={item.value} value={item.value}>{item.text}</option>)}
                                            </select>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <label id={`select-`}>Tip Cladire: </label>
                                            <select {...register("buildingType")} className="form-control" placeholder={"Tip Cladire: "}>
                                                {[{ value: "bloc", text: "bloc" }].map(item => <option key={item.value} value={item.value}>{item.text}</option>)}
                                            </select>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <label id={`select-`}>Confort: </label>
                                            <select {...register("comfort")} className="form-control" placeholder={"Confort: "}>
                                                {[{ value: "lux", text: "lux" }].map(item => <option key={item.value} value={item.value}>{item.text}</option>)}
                                            </select>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <label>Suprafata utila mp: </label>
                                            <input className={`form-control`} {...register("usableArea")} />
                                            <div className="invalid-feedback">{errors.usableArea?.message}</div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <label>Suprafata totala mp: </label>
                                            <input className={`form-control`} {...register("totalUsableArea")} />
                                            <div className="invalid-feedback">{errors.totalUsableArea?.message}</div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <label id={`select-`}>An constructie: </label>
                                            <select {...register("constructionYear")} className="form-control" placeholder={"An Constructie: "}>
                                                {generateYears().map(year => { return { value: year, text: String(year) } }).map(item => <option key={item.value} value={item.value}>{item.text}</option>)}
                                            </select>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <label id={`select-`}>Structura cladire: </label>
                                            <select {...register("structure")} className="form-control" placeholder={"Structura Cladire: "}>
                                                {[{ value: "beton", text: "beton" }].map(item => <option key={item.value} value={item.value}>{item.text}</option>)}
                                            </select>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>Apare pe landing page: </Typography>
                                            <p>Doar un numar de 6 proprietati pot fi afisate pe landing page: </p>
                                            <label className="form-check-label" htmlFor="isFeatured">Adauga proprietatea in homepage: </label>
                                            <input id="isFeatured" type="checkbox" {...register("isFeatured")} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/*  */}
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Typography color="primary">Utilitati:</Typography>
                                        <Grid item xs={6}>
                                            <Typography>Generale: </Typography>

                                            <FormControlLabel control={<Checkbox onChange={(e) => { handleGeneralUtilities(e.target.value, "general") }} name="checkA" value="Curent" />} label="Curent" />
                                            <FormControlLabel control={<Checkbox onChange={(e) => { handleGeneralUtilities(e.target.value, "general") }} name="checkB" value="Apa" />} label="Apa" />
                                            <FormControlLabel control={<Checkbox onChange={(e) => { handleGeneralUtilities(e.target.value, "general") }} name="checkC" value="Canalizare" />} label="Canalizare" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>Sistem incalzire: </Typography>
                                            <FormControlLabel control={<Checkbox onChange={(e) => { handleGeneralUtilities(e.target.value, "heatingSystem") }} name="checkD" value="Centrala Proprie" />} label="Centrala Proprie" />
                                            <FormControlLabel control={<Checkbox onChange={(e) => { handleGeneralUtilities(e.target.value, "heatingSystem") }} name="checkE" value="Calorifer" />} label="Calorifer" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography>Climatizare: </Typography>
                                            <FormControlLabel control={<Checkbox onChange={(e) => { handleGeneralUtilities(e.target.value, "conditioning") }} name="checkF" value="Aer Conditionat" />} label="Aer Conditionat" />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Typography color="primary">Amenajari: </Typography>

                                        <Grid item xs={6}>
                                            <Typography >Cladire: </Typography>
                                            <FormControlLabel control={<Checkbox onChange={(e) => { handleAmenities(e.target.value, "building") }} name="checkG" value="Interfon" />} label="Interfon" />
                                            <FormControlLabel control={<Checkbox onChange={(e) => { handleAmenities(e.target.value, "building") }} name="checkH" value="Curte" />} label="Curte" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <LeafletMap getMapCoords={getMapCoords} propertyCoords={houseProperties.coords || null} />
                                </Grid>
                                <Grid item xs={12}>
                                    <ImagesUpload deleteImages={deletedImages} uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Button type="submit" variant="contained" color="primary">{isModify ? "Modifica" : "Trimite"}</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {isModify && <Button type="button" onClick={() => { handleRemove(shortId) }} variant="contained" color="secondary">Sterge</Button>}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </div>
            </Container>}
        </React.Fragment>
    );
}

export default HouseForm;
