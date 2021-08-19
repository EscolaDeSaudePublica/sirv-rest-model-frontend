import * as React from "react";
import * as ReactDOM from "react-dom";
import { useRef, useLayoutEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { Footnotes } from 'react-footnotes'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Equation, EquationEvaluate, EquationOptions, defaultErrorHandler } from 'react-equation';
import { defaultVariables, defaultFunctions } from 'equation-resolver';
import Chip from '@material-ui/core/Chip';
import { Collapse } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';


console.log(process.env.REACT_APP_BASE_URL_);
const domain = process.env.REACT_APP_BASE_URL_;


const marks_dias = [


    {
        value: 0,
        label: '0',
    },


    {
        value: 10,
        label: '10 dias',
    },

    {
        value: 30,
        label: '30 dias',
    },

    {
        value: 90,
        label: '90',
    },


];

const marks_infectados = [



    {
        value: 9000,
        label: '9000 pessoas',
    },

   
    {
        value: 60000,
        label: '60000',
    },


];


const marks_velocidade = [

    {
        value: 0,
        label: '0',
    },
   
    {
        value: 100000,
        label: '100k',
    },
   
    {
        value: 150000,
        label: '150k',
    },
    
    {
        value: 200000,
        label: '200k',
    },
    
    

    {
        value: 290000,
        label: '290k',
    },

  

];

const marks = [

    {
        value: 0.25,
        label: '25% ',
    },

    {
        value: 0.5,
        label: '50% ',
    },

    {
        value: 0.75,
        label: '75% ',
    },

    {
        value: 0.90,
        label: '90%',
    },


];





class FormSIRV extends React.Component {
    private stepInput: React.RefObject<HTMLSpanElement>;

    padLeadingZeros(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    data = new Date();

    formatedDate_start_date = `${this.data.getFullYear()}-${this.padLeadingZeros(this.data.getMonth()+1, 2)}-${this.padLeadingZeros(this.data.getDate(),2)}`
    formatedDate_end_date = `${this.data.getFullYear()}-${this.padLeadingZeros(this.data.getMonth() + 2, 2)}-${this.padLeadingZeros(this.data.getDate(), 2)}`


    componentDidMount() {
        this.calc_vaccine_efficacy_with_vacine_data();
        this.calc_vaccine_efficacy();
    
    }



    constructor(props) {
        super(props);
        this.stepInput = React.createRef();
        this.calc_vaccine_efficacy_with_vacine_data();
        this.calc_vaccine_efficacy();

        

    }
   


    state = {
        number_of_people_with_astrazenica_1: 582803,
        number_of_people_with_pfizer_1: 121626,
        number_of_people_with_coronavac_1: 636780,
        number_of_people_with_janssen_1: 7,
        number_of_people_with_astrazenica_2: 80980,
        number_of_people_with_pfizer_2: 105,
        number_of_people_with_coronavac_2: 565726,
        number_of_people_with_janssen_2:7,
        eficacia_pfizer_1: 0.487,
        eficacia_pfizer_2: 0.95,
        eficacia_astrazenica_1: 0.77,
        eficacia_astrazenica_2: 0.941,
        eficacia_coronavac_1:0.30,
        eficacia_coronavac_2: 0.507,
        eficacia_janssen_1: 0.669,
        eficacia_janssen_2: 0.669,
        vaccine_efficacy: 0.66,
        velocidade_vacinacao: 0.001,
        quantidade_infectados: 0,
        dias_nova_infeccao:10,
        random: 0,
        random_2: 0,
        figure: '',
        domain: '',
        first_dose_efficacy: 0.5,
        second_dose_efficacy: 0.5,
        speed_first_dose: 9000,
        speed_second_dose: 9000,
        death_factor: 0.028,
        hospitalization_factor: 0.1,
        isOpen: false,
        isOption: false,
        start_date: this.formatedDate_start_date,
        end_date: this.formatedDate_end_date,
       

        
        
   

        
    };

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ vaccine_efficacy: e.currentTarget.value });
    };




  
 

   


    resetIframe() {
        this.setState({ random: this.state.random + 1 });
    }

    resetIframe_2() {
        this.setState({ random_2: this.state.random_2 + 1 });
    }


    calc_vaccine_efficacy_with_vacine_data() {

        console.log('calc vaccine efficacy with data');

        var numerador = (this.state.eficacia_astrazenica_1 * this.state.number_of_people_with_astrazenica_1) +
            (this.state.eficacia_pfizer_1 * this.state.number_of_people_with_pfizer_1) +
            (this.state.eficacia_coronavac_1 * this.state.number_of_people_with_coronavac_1) +
            (this.state.eficacia_janssen_1 * this.state.number_of_people_with_janssen_1);
        console.log(numerador);


        var denominador = (Number(this.state.number_of_people_with_astrazenica_1) + Number(this.state.number_of_people_with_pfizer_1) +
            Number(this.state.number_of_people_with_coronavac_1) + Number(this.state.number_of_people_with_janssen_1));

        console.log(denominador);
        var first_dose_eff = (numerador / denominador)
        console.log('first dose eff');
        console.log(first_dose_eff);
        var second_dose_eff = ((this.state.eficacia_astrazenica_2 * this.state.number_of_people_with_astrazenica_2) +
            (this.state.eficacia_pfizer_2 * this.state.number_of_people_with_pfizer_2) +
            (this.state.eficacia_coronavac_2 * this.state.number_of_people_with_coronavac_2) +
            (this.state.eficacia_janssen_2 * this.state.number_of_people_with_janssen_2)) /
            (Number(this.state.number_of_people_with_astrazenica_2) + Number(this.state.number_of_people_with_pfizer_2) +
            Number(this.state.number_of_people_with_coronavac_2) + Number(this.state.number_of_people_with_janssen_2))

        this.setState({ first_dose_efficacy: first_dose_eff });
        this.setState({ second_dose_efficacy: second_dose_eff });


       

        this.resetIframe();

    }

    calc_vaccine_efficacy() {

        console.log('calc vaccine efficacy');
        console.log('first dose efficacy ' + this.state.first_dose_efficacy);
        console.log('second dose efficacy ' + this.state.second_dose_efficacy);
        console.log('speed first dose ' + this.state.speed_first_dose);
        console.log('speed second dose ' + this.state.speed_second_dose);

        this.setState({
            vaccine_efficacy: (((Number(this.state.first_dose_efficacy) *
                Number(this.state.speed_first_dose)) + (Number(this.state.second_dose_efficacy) *
                Number(this.state.speed_second_dose))) / (Number(this.state.speed_first_dose) +
                Number(this.state.speed_second_dose)))

        });


        this.setState({
            velocidade_vacinacao: (Number(this.state.speed_first_dose) +
                Number(this.state.speed_second_dose)
                )

        });


        this.resetIframe();

        console.log(this.state.vaccine_efficacy
        );

    }



    handleChange = (event, newValue) => {

       this.calc_vaccine_efficacy()
    };



    handleChange_start_date_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {


        this.setState({ start_date: event.target.value }, function (this: FormSIRV) {
            console.log(this.state.start_date);
            console.log(this.state.end_date);
            this.resetIframe_2();
            

        })

       
    };



    handleChange_end_date_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {


        this.setState({ end_date: event.target.value }, function (this: FormSIRV) {
            console.log(this.state.start_date);
            console.log(this.state.end_date);
            this.resetIframe_2();
            

        })
    };


    handleChange_first_dose_efficacy = (event, newValue) => {
        this.setState({ first_dose_efficacy: newValue }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy();
        })
    };


    handleChange_first_dose_efficacy_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ first_dose_efficacy: event.target.value });

       
        this.calc_vaccine_efficacy()
        
    };


    handleChange_astrazenica_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_astrazenica_1: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        }) 
    };



    handleChange_pfizer_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_pfizer_1: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        }) 
    };



    handleChange_janssen_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_janssen_1: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        }) 
    };



    handleChange_coronavac_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_coronavac_1: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        }) 
    };



    handleChange_eff_astrazenica_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ eficacia_astrazenica_1 : event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        })
    };



    handleChange_eff_pfizer_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ eficacia_pfizer_1: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        })
    };



    handleChange_eff_janssen_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ eficacia_janssen_1: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        })
    };



    handleChange_eff_coronavac_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ eficacia_coronavac_1: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        })
    };



    handleChange_eff_astrazenica_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ eficacia_astrazenica_2: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        })
    };



    handleChange_eff_pfizer_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ eficacia_pfizer_2: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        })
    };



    handleChange_eff_janssen_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ eficacia_janssen_2: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        })
    };



    handleChange_eff_coronavac_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ eficacia_coronavac_2: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        })
    };





    handleChange_astrazenica_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_astrazenica_2: event.target.value });
        this.calc_vaccine_efficacy_with_vacine_data();
        this.calc_vaccine_efficacy();
    };



    handleChange_pfizer_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_pfizer_2: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        }) 
    };



    handleChange_janssen_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_janssen_2: event.target.value }, function (this: FormSIRV) {
            this.calc_vaccine_efficacy_with_vacine_data();
            this.calc_vaccine_efficacy();

        }) 
    };



    handleChange_coronavac_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_coronavac_2: event.target.value }, function (this: FormSIRV) {
        this.calc_vaccine_efficacy_with_vacine_data();
        this.calc_vaccine_efficacy();

        }) 
    };



    handleChange_second_dose_efficacy = (event, newValue) => {
        this.setState({ second_dose_efficacy: newValue }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })  
    };


    handleChange_second_dose_efficacy_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ second_dose_efficacy: event.target.value }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })  

    };

    handleChange_speed_first_dose = (event, newValue) => {
        this.setState({ speed_first_dose: newValue }, function (this: FormSIRV) {
            console.log('speed first dose ');
            console.log(this.state.speed_first_dose);
            this.calc_vaccine_efficacy();
        })   
    };

    handleChange_first_dose_speed_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ speed_first_dose: event.target.value }, function (this: FormSIRV) {
            console.log('speed first dose: ');
            console.log(this.state.speed_first_dose);
            this.calc_vaccine_efficacy();
        })
        

    };



    handleChange_speed_second_dose = (event, newValue) => {
        this.setState({ speed_second_dose: newValue }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })  
    };


    handleChange_second_dose_speed_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ speed_second_dose: event.target.value }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })  

    };

    handleChange_quantidade_infectados_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ quantidade_infectados: event.target.value }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })  
       

    };


    handleChange_dias_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ dias_nova_infeccao: event.target.value }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })  
        

    };


    handleChange_velocidade = (event, newValue) => {
        this.setState({ velocidade_vacinacao: newValue });
    };


    handleChange_quantidade_infectados = (event, newValue) => {
        this.setState({ quantidade_infectados: newValue }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })  
    };

    handleChange_dias_nova_infeccao = (event, newValue) => {
        this.setState({ dias_nova_infeccao: newValue }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })  

    };


    handleChange_death_factor = (event, newValue) => {
        this.setState({ death_factor: newValue }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })

    };


    handleChange_death_factor_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ death_factor: event.target.value }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })


    };



    handleChange_hospitalization_factor_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ hospitalization_factor: event.target.value }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })


    };




    handleChange_hospitalization_factor = (event, newValue) => {
        this.setState({ hospitalization_factor: newValue }, function (this: FormSIRV) {

            this.calc_vaccine_efficacy();

        })

    };

    
    change_state() {
        this.setState({
            isOpen: !this.state.isOpen
        });

    }

    change_state_option() {
        this.setState({
            isOption: !this.state.isOption
        });

    }

  
    public render() {


       
        return (

            <React.Fragment >
                <div>


                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table" style={{ verticalAlign:'top' }}>

                            <TableBody>
                                <TableRow>
                                    <TableCell >
                                        <Button variant="contained"
                                            color="primary" onClick={() => { this.resetIframe(); }}>Simular</Button>
                                    </TableCell>
                                    <TableCell >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => { this.change_state(); }}> 
                                            Como funciona o simulador?
                                        </Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                   

                                    <TableCell colSpan={3}>
                                        {this.state.isOpen ?
                                            <Card >
                                                <CardContent>
                                                    <Typography color="primary" variant="subtitle1" gutterBottom>
                                                        Eficácia das vacinas aplicadas a partir do COVID-19 VACCINE COMPARISON CHART from The Medical Letter disponível em https://secure.medicalletter.org/w1621g.
                                                        O presente modelo é uma adaptação do modelo SIRV publicado por Ishikawa no paper Optimal Strategies for Vaccination
                                                        using the Stochastic SIRV Model
                                                        , aplicando-se uma media ponderada das vacinas em suas primeira e segunda doses. Segundo as equações:

                                                 </Typography>
                                                    <EquationOptions
                                                        variables={defaultVariables}
                                                        functions={defaultFunctions}
                                                        errorHandler={defaultErrorHandler}
                                                    >
                                                        <Equation
                                                            value=' dS = (-beta*I[t]*(S[t]/(1+speed_factor*S[t]))-alpha*u[t]) * dt'
                                                        />


                                                    </EquationOptions>
                                                    <br />
                                                    <EquationOptions
                                                        variables={defaultVariables}
                                                        functions={defaultFunctions}
                                                        errorHandler={defaultErrorHandler}
                                                    >

                                                        <Equation
                                                            value='  dI = (beta*I[t]*(S[t]/(1+speed_factor*S[t])) - gamma*I[t]) * dt'
                                                        />
                                                    </EquationOptions>
                                                    <br />
                                                    <EquationOptions
                                                        variables={defaultVariables}
                                                        functions={defaultFunctions}
                                                        errorHandler={defaultErrorHandler}
                                                    >

                                                        <Equation
                                                            value=' dR = (gamma*I[t]) * dt'
                                                        />
                                                    </EquationOptions>
                                                    <br />
                                                    <EquationOptions
                                                        variables={defaultVariables}
                                                        functions={defaultFunctions}
                                                        errorHandler={defaultErrorHandler}
                                                    >

                                                        <Equation
                                                            value='  dV=alpha*u[t] * dt'
                                                        />
                                                        <br />

                                                    </EquationOptions>

                                                   Parametros do modelo:
                                                        beta (rate of infection)
                                                        ,gamma  (rate of removal)
                                                        ,alpha (vaccine efficacy)
                                                        ,mu (mortality rate) <br />

                                                    Parâmetros:  beta = 9.76e-2;
        gamma =7.81e-2;
        mu=1.9e-2; <br />



                                                </CardContent>
                                                <CardContent>
                                                    <Typography color="primary" variant="subtitle1" gutterBottom>
                                                        Eficácia ponderada calculada de acordo com a equação:

                                                     </Typography>
                                                            <EquationOptions
                                                                variables={defaultVariables}
                                                                functions={defaultFunctions}
                                                                errorHandler={defaultErrorHandler}
                                                            >
                                                                <Equation
                                                                    value='((n_vacinados_pfizer*eficacia_vacina_pfizer)+(n_vacinados_AstraZeneca*eficacia_vacina_AstraZeneca)+(n_vacinados_coronavac*eficacia_vacina_coronavac)+(n_vacinados_janssen*eficacia_vacina_janssen))/ (n_vacinados_pfizer+numero_vacinados_AstraZeneca+n_vacinados_coronava+n_vacinados_janssen)'
                                                                />

                                                    </EquationOptions>
                                                </CardContent>

                                            </Card>
                                            : null}

                                       

                                    </TableCell>


                                </TableRow>
                             
                                <TableRow style={{ verticalAlign: 'top' }}>
                                    <TableCell width="20%">
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" >
                                                        1
                                                </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">
                                                        
                                                    </IconButton>
                                                }
                                                title="Primeira Dose"
                                                subheader="Quantidade de Vacinados"
                                            />
                                            <CardContent>
                                                <TableContainer component={Paper}>
                                                    <Table size="small" aria-label="a dense table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>AstraZeneca</TableCell>
                                                                <TableCell align="left"><TextField value={this.state.number_of_people_with_astrazenica_1}
                                                                                            type="number"
                                                                                            InputLabelProps={{
                                                                                                shrink: true,
                                                                                             }}
                                                                                            label="Número de Pessoas"
                                                                                            onChange={this.handleChange_astrazenica_text_input} /></TableCell>
                                   
                                                             </TableRow>
                                                            <TableRow>
                                                                <TableCell>Pfizer</TableCell>
                                                                <TableCell align="left"><TextField value={this.state.number_of_people_with_pfizer_1}
                                                                    type="number"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    label="Número de Pessoas"
                                                                    onChange={this.handleChange_pfizer_text_input} /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Coronavac</TableCell>
                                                                <TableCell align="left"><TextField value={this.state.number_of_people_with_coronavac_1}
                                                                    type="number"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    label="Número de Pessoas"
                                                                    onChange={this.handleChange_coronavac_text_input} /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Janssen </TableCell>
                                                                <TableCell align="left"><TextField value={this.state.number_of_people_with_janssen_1}
                                                                    type="number"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    label="Número de Pessoas"
                                                                    onChange={this.handleChange_janssen_text_input} /></TableCell>

                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                             </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" >
                                                        2
                                                </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">

                                                    </IconButton>
                                                }
                                                title="Segunda Dose"
                                                subheader="Quantidade de Vacinados"
                                            />
                                            <CardContent>
                                                <TableContainer component={Paper}>
                                                    <Table size="small" aria-label="a dense table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>AstraZeneca</TableCell>
                                                                <TableCell align="left"><TextField value={this.state.number_of_people_with_astrazenica_2}
                                                                    type="number"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    label="Número de Pessoas"
                                                                    onChange={this.handleChange_astrazenica_text_input_2} /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Pfizer</TableCell>
                                                                <TableCell align="left"><TextField value={this.state.number_of_people_with_pfizer_2}
                                                                    type="number"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    label="Número de Pessoas"
                                                                    onChange={this.handleChange_pfizer_text_input_2} /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Coronavac</TableCell>
                                                                <TableCell align="left"><TextField value={this.state.number_of_people_with_coronavac_2}
                                                                    type="number"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    label="Número de Pessoas"
                                                                    onChange={this.handleChange_coronavac_text_input_2} /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Janssen</TableCell>
                                                                <TableCell align="left"><TextField value={this.state.number_of_people_with_janssen_2}
                                                                    type="number"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    label="Número de Pessoas"
                                                                    onChange={this.handleChange_janssen_text_input_2} /></TableCell>

                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" >
                                                        3
                                                </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">

                                                    </IconButton>
                                                }
                                                title="Eficácia de Cada Vacina"
                                                subheader="Primeira Dose"
                                            />
                                            <CardContent>
                                                <TableContainer component={Paper}>
                                                    <Table size="small" aria-label="a dense table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>AstraZeneca</TableCell>
                                                                <TableCell align="left">
                                                                    <Chip label={Number(this.state.eficacia_astrazenica_1)} variant="outlined" />
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Pfizer</TableCell>
                                                                <TableCell align="left">
                                                                    <Chip label={Number(this.state.eficacia_pfizer_1)} variant="outlined" />
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Coronavac</TableCell>
                                                                <TableCell align="left"> <Chip label={Number(this.state.eficacia_coronavac_1)} variant="outlined" />
                                                                </TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Janssen (Dose Única)</TableCell>
                                                                <TableCell align="left"> <Chip label={Number(this.state.eficacia_janssen_1)} variant="outlined" />
                                                                </TableCell>

                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" >
                                                        4
                                                </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">

                                                    </IconButton>
                                                }
                                                title="Eficácia de Cada Vacina"
                                                subheader="Segunda Dose"
                                            />
                                            <CardContent>
                                                <TableContainer component={Paper}>
                                                    <Table size="small" aria-label="a dense table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>AstraZeneca</TableCell>
                                                                <TableCell align="left">
                                                                    <Chip label={Number(this.state.eficacia_astrazenica_2)} variant="outlined" />
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Pfizer</TableCell>
                                                                <TableCell align="left">
                                                                    <Chip label={Number(this.state.eficacia_pfizer_2)} variant="outlined" />
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Coronavac</TableCell>
                                                                <TableCell align="left"> <Chip label={Number(this.state.eficacia_coronavac_2)} variant="outlined" />
                                                                </TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Janssen (Dose Única)</TableCell>
                                                                <TableCell align="left"> <Chip label={Number(this.state.eficacia_janssen_2)} variant="outlined" />
                                                                </TableCell>

                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => { this.change_state_option(); }}>
                                                Opções Avançadas
                                             </Button>
                                            
                                        </Card>

                                        {this.state.isOption ?


                                            <Card>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" >
                                                            Configuração
                                                </Avatar>
                                                    }
                                                    action={
                                                        <IconButton aria-label="settings">

                                                        </IconButton>
                                                    }
                                                    title="Percentual de Óbitos e Hospitalização"
                                                    subheader="Valor de 0 a 1"
                                                />
                                                <CardContent>
                                                    <TableContainer component={Paper}>
                                                        <Table size="small" aria-label="a dense table">
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell> Percentual de Óbitos:</TableCell>
                                                                <TableCell>

                                                                    <TextField value={this.state.death_factor}
                                                                            onChange={this.handleChange_death_factor_text_input} />
                                                                </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell> Percentual de Hospitalizações:</TableCell>
                                                                    <TableCell>

                                                                        <TextField value={this.state.hospitalization_factor}
                                                                            onChange={this.handleChange_hospitalization_factor_text_input} />
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </CardContent>
                                            </Card>




                                            : null}
                                        {this.state.isOption ?

                                           
                                            <Card>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" >
                                                            Configuração
                                                </Avatar>
                                                    }
                                                    action={
                                                        <IconButton aria-label="settings">

                                                        </IconButton>
                                                    }
                                                    title="Eficácia das Vacinas"
                                                    subheader="Valor de 0 a 1"
                                                />
                                                <CardContent>
                                                    <TableContainer component={Paper}>
                                                        <Table size="small" aria-label="a dense table">
                                                            <TableBody>
                                                               
                                                                <TableRow>
                                                                    <TableCell> Eficácia da Vacina (primeira dose):
                                                                    
                                                                </TableCell>
                                                                    <TableCell align="left"><TextField value={this.state.first_dose_efficacy}
                                                                        onChange={this.handleChange_first_dose_efficacy_text_input}
                                                                    />




                                                                    </TableCell>

                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell colSpan={2}>   <Slider

                                                                        value={this.state.first_dose_efficacy}
                                                                        orientation="horizontal"
                                                                        defaultValue={0.5}
                                                                        step={0.05}
                                                                        min={0}
                                                                        max={1}
                                                                        valueLabelDisplay="auto"
                                                                        aria-labelledby="vertical-slider"
                                                                        marks={marks}
                                                                        onChange={this.handleChange_first_dose_efficacy}
                                                                    /></TableCell>

                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell> Eficácia da Vacina (segunda dose):
                                                                    
                                                                </TableCell>
                                                                    <TableCell>

                                                                        <TextField value={this.state.second_dose_efficacy}
                                                                            onChange={this.handleChange_second_dose_efficacy_text_input} /></TableCell>

                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell colSpan={2}><Slider
                                                                        value={this.state.second_dose_efficacy}
                                                                        orientation="horizontal"
                                                                        defaultValue={0.5}
                                                                        step={0.05}
                                                                        min={0}
                                                                        max={1}
                                                                        valueLabelDisplay="auto"
                                                                        aria-labelledby="vertical-slider"
                                                                        marks={marks}
                                                                        onChange={this.handleChange_second_dose_efficacy}
                                                                    /></TableCell>

                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </CardContent>
                                            </Card>




                                            : null}



                                        {this.state.isOption ?
                                            <Card>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" >
                                                            Opções
                                                </Avatar>
                                                    }
                                                    action={
                                                        <IconButton aria-label="settings">

                                                        </IconButton>
                                                    }
                                                    title="Eficácia das Vacinas"
                                                    subheader="Primeira Dose"
                                                />
                                                <CardContent>
                                                    <TableContainer component={Paper}>
                                                        <Table size="small" aria-label="a dense table">
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell>AstraZeneca</TableCell>
                                                                    <TableCell align="left"><TextField value={this.state.eficacia_astrazenica_1}
                                                                        type="number"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        label="Eficácia da Vacina"
                                                                        onChange={this.handleChange_eff_astrazenica_text_input} /></TableCell>

                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>Pfizer</TableCell>
                                                                    <TableCell align="left"><TextField value={this.state.eficacia_pfizer_1}
                                                                        type="number"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        label="Eficácia da Vacina"
                                                                        onChange={this.handleChange_eff_pfizer_text_input} /></TableCell>

                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>Coronavac</TableCell>
                                                                    <TableCell align="left"><TextField value={this.state.eficacia_coronavac_1}
                                                                        type="number"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        label="Eficácia da Vacina"
                                                                        onChange={this.handleChange_eff_coronavac_text_input} /></TableCell>

                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>Janssen</TableCell>
                                                                    <TableCell align="left"><TextField value={this.state.eficacia_janssen_1}
                                                                        type="number"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        label="Eficácia da Vacina"
                                                                        onChange={this.handleChange_eff_janssen_text_input} /></TableCell>

                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </CardContent>
                                            </Card>


                                            : null}


                                        {this.state.isOption ?
                                            <Card>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" >
                                                            Opções
                                                </Avatar>
                                                    }
                                                    action={
                                                        <IconButton aria-label="settings">

                                                        </IconButton>
                                                    }
                                                    title="Eficácia das Vacinas"
                                                    subheader="Segunda Dose"
                                                />
                                                <CardContent>
                                                    <TableContainer component={Paper}>
                                                        <Table size="small" aria-label="a dense table">
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell>AstraZeneca</TableCell>
                                                                    <TableCell align="left"><TextField value={this.state.eficacia_astrazenica_2}
                                                                        type="number"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        label="Eficácia da Vacina"
                                                                        onChange={this.handleChange_eff_astrazenica_text_input_2} /></TableCell>

                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>Pfizer</TableCell>
                                                                    <TableCell align="left"><TextField value={this.state.eficacia_pfizer_2}
                                                                        type="number"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        label="Eficácia da Vacina"
                                                                        onChange={this.handleChange_eff_pfizer_text_input_2} /></TableCell>

                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>Coronavac</TableCell>
                                                                    <TableCell align="left"><TextField value={this.state.eficacia_coronavac_2}
                                                                        type="number"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        label="Eficácia da Vacina"
                                                                        onChange={this.handleChange_eff_coronavac_text_input_2} /></TableCell>

                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>Janssen</TableCell>
                                                                    <TableCell align="left"><TextField value={this.state.eficacia_janssen_2}
                                                                        type="number"
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        label="Eficácia da Vacina"
                                                                        onChange={this.handleChange_eff_janssen_text_input_2} /></TableCell>

                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </CardContent>
                                            </Card>


                                            : null}
                                    </TableCell>
                                    <TableCell width="25%">
                                       
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" >
                                                        5
                                                </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">

                                                    </IconButton>
                                                }
                                                title="Velocidade da Vacinação"
                                                subheader="Número de Pessoas por dia"
                                            />
                                            <CardContent>
                                                <TableContainer component={Paper}>
                                                    <Table size="small" aria-label="a dense table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>  Velocidade de  Vacinação (primeira dose)(K pessoas por dia):</TableCell>
                                                                <TableCell align="left">
                                                                    <TextField value={this.state.speed_first_dose}
                                                                        onChange={this.handleChange_first_dose_speed_text_input} /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell colSpan={2}><Slider
                                                                    key={this.state.random} 
                                                                    value={this.state.speed_first_dose}
                                                                    orientation="horizontal"
                                                                    defaultValue={9000}
                                                                    step={1}
                                                                    min={0}
                                                                    max={300000}
                                                                    valueLabelDisplay="auto"
                                                                    aria-labelledby="vertical-slider"
                                                                    marks={marks_velocidade}
                                                                    onChange={this.handleChange_speed_first_dose}
                                                                /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>  Velocidade de  Vacinação (segunda dose)(K pessoas por dia):</TableCell>
                                                                <TableCell align="left">
                                                                    <TextField value={this.state.speed_second_dose}
                                                                        onChange={this.handleChange_second_dose_speed_text_input} /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell colSpan={2}><Slider
                                                                    value={this.state.speed_second_dose}
                                                                    key={this.state.random} 
                                                                    orientation="horizontal"
                                                                    defaultValue={9000}
                                                                    step={1}
                                                                    min={0}
                                                                    max={300000}
                                                                    valueLabelDisplay="auto"
                                                                    aria-labelledby="vertical-slider"
                                                                    marks={marks_velocidade}
                                                                    onChange={this.handleChange_speed_second_dose}
                                                                /></TableCell>

                                                            </TableRow>
                                                          
                                                             
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" >
                                                        6
                                                </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">

                                                    </IconButton>
                                                }
                                                title="Eficácia Ponderada das Vacinas"
                                                subheader="Calculando Primeira e Segunda dose"
                                            />
                                            <CardContent>
                                                <TableContainer component={Paper}>
                                                    <Table size="small" aria-label="a dense table">
                                                        <TableBody>

                                                            <TableRow>
                                                                <TableCell>   Eficácia ponderada da vacina :
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <TextField value={this.state.vaccine_efficacy}
                                                                    /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell colSpan={2}> <Slider
                                                                    value={this.state.vaccine_efficacy}
                                                                    orientation="horizontal"
                                                                    defaultValue={0.5}
                                                                    step={0.05}
                                                                    min={0}
                                                                    max={1}
                                                                    valueLabelDisplay="auto"
                                                                    marks={marks}
                                                                    onChange={this.handleChange_velocidade}
                                                                /></TableCell>
                                                            </TableRow>

                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" >
                                                        7
                                                </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">

                                                    </IconButton>
                                                }
                                                title="Novos infectados no sistema"
                                                subheader="Novo grupo de infectados adicionados ao sistema"
                                            />
                                            <CardContent>
                                                <TableContainer component={Paper}>
                                                    <Table size="small" aria-label="a dense table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>   Quantidade de novos infectados no modelo:</TableCell>
                                                                <TableCell align="left">
                                                                    <TextField value={this.state.quantidade_infectados}
                                                                        onChange={this.handleChange_quantidade_infectados_text_input} /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell colSpan={2}>    <Slider
                                                                    value={this.state.quantidade_infectados}
                                                                    orientation="horizontal"
                                                                    defaultValue={0}
                                                                    step={1}
                                                                    min={0}
                                                                    max={60000}
                                                                    valueLabelDisplay="auto"
                                                                    aria-labelledby="vertical-slider"
                                                                    marks={marks_infectados}
                                                                    onChange={this.handleChange_quantidade_infectados}
                                                                /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>   Quantidade de dias entre novas infecções:</TableCell>
                                                                <TableCell align="left">
                                                                    <TextField value={this.state.dias_nova_infeccao}
                                                                        onChange={this.handleChange_dias_text_input} /></TableCell>

                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell colSpan={2}>      <Slider
                                                                    value={this.state.dias_nova_infeccao}
                                                                    orientation="horizontal"
                                                                    defaultValue={0}
                                                                    step={1}
                                                                    min={0}
                                                                    max={90}
                                                                    aria-labelledby="vertical-slider"
                                                                    marks={marks_dias}
                                                                    valueLabelDisplay="auto"
                                                                    onChange={this.handleChange_dias_nova_infeccao}
                                                                /></TableCell>

                                                            </TableRow>
                                                        

                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" >
                                                        8
                                                </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">

                                                    </IconButton>
                                                }
                                                title="Filtro de Datas para tabela"
                                                subheader="Data de Início e fim do filtro"
                                            />
                                            <CardContent>
                                                <TableContainer component={Paper}>
                                                    <Table size="small" aria-label="a dense table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>   Data de Início:</TableCell>
                                                                <TableCell align="left">
                                                                    <TextField
                                                                        id="data"
                                                                        label="Data de Início"
                                                                        type="date"
                                                                        defaultValue={this.formatedDate_start_date}
                                                                        onChange={this.handleChange_start_date_text_input}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                    />
                                                                 </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>   Data de Fim:</TableCell>
                                                                <TableCell align="left">
                                                                    <TextField
                                                                        id="data"
                                                                        label="Data de Fim"
                                                                        type="date"
                                                                        defaultValue={this.formatedDate_end_date}
                                                                        onChange={this.handleChange_end_date_text_input}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>


                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </TableCell>
                                    <TableCell width="50%">
                                        <Card>
                                            <CardContent>
                                                <iframe frameBorder="0" key={this.state.random_2} src={process.env.REACT_APP_BASE_URL_ + "/filter_date/" + this.state.vaccine_efficacy + "/" + (this.state.velocidade_vacinacao / 9000000) + "/" + (this.state.quantidade_infectados / 9000000) + "/" + this.state.dias_nova_infeccao + "/0/" + this.state.death_factor + "/" + this.state.hospitalization_factor + "/" + this.state.start_date + "/" + this.state.end_date+"/"} width="90%"
                                                    height="500px" scrolling="yes" ></iframe>
                                            </CardContent>
                                            <CardContent>
                                                <iframe frameBorder="0" key={this.state.random} src={process.env.REACT_APP_BASE_URL_ + "/" + this.state.vaccine_efficacy + "/" + (this.state.velocidade_vacinacao / 9000000) + "/" + (this.state.quantidade_infectados / 9000000) + "/" + this.state.dias_nova_infeccao + "/0/" + this.state.death_factor + "/" + this.state.hospitalization_factor + "/"} width="90%"
                                                    height="3000px" scrolling="no" ></iframe>
                                            </CardContent>
                                        </Card>
                                    </TableCell>
                                </TableRow>
                           
                                
                               
                               
                            </TableBody>
                        </Table>   

                    </TableContainer>
                    <br/>


           


                 




                   

                

                    

                
                    
                </div>


            </React.Fragment >
        );
    }
}

ReactDOM.render(<FormSIRV />, document.getElementById("root"));
