import * as React from "react";
import * as ReactDOM from "react-dom";
import { useRef, useLayoutEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { Footnotes } from 'react-footnotes'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Equation, EquationEvaluate, EquationOptions, defaultErrorHandler } from 'react-equation'
import { defaultVariables, defaultFunctions } from 'equation-resolver'

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
        value: 15000,
        label: '15000 pessoas',
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
        value: 10000,
        label: '10k',
    },
    {
        value: 20000,
        label: '20k',
    },
    {
        value: 30000,
        label: '30',
    },
    {
        value: 40000,
        label: '40k',
    },
    {
        value: 50000,
        label: '50k',
    },
    {
        value: 60000,
        label: '60k',
    },
    {
        value: 70000,
        label: '70k',
    },
    {
        value: 80000,
        label: '80k',
    },
    {
        value: 90000,
        label: '90k',
    },
    {
        value: 100000,
        label: '100k',
    },
    {
        value: 110000,
        label: '110k',
    },
    {
        value: 120000,
        label: '120k',
    },
    {
        value: 130000,
        label: '130k',
    },
    {
        value: 140000,
        label: '140k',
    },
    {
        value: 150000,
        label: '150k',
    },
    {
        value: 160000,
        label: '160k',
    },
    {
        value: 160000,
        label: '160k',
    },
    {
        value: 170000,
        label: '170k',
    },
    {
        value: 180000,
        label: '180k',
    },
    {
        value: 190000,
        label: '190k',
    },
    {
        value: 200000,
        label: '200k',
    },
    {
        value: 210000,
        label: '210k',
    },
    {
        value: 220000,
        label: '220k',
    },
    {
        value: 230000,
        label: '230k',
    },
    {
        value: 240000,
        label: '240k',
    },
    {
        value: 250000,
        label: '250k',
    },
    {
        value: 260000,
        label: '260k',
    },
    {
        value: 250000,
        label: '250k',
    },

    {
        value: 260000,
        label: '260k',
    },
    {
        value: 270000,
        label: '270k',
    },
    {
        value: 280000,
        label: '280k',
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
    
    componentDidMount() {
        this.calc_vaccine_efficacy_with_vacine_data();
    
    }


    constructor(props) {
        super(props);
        this.stepInput = React.createRef();
        this.calc_vaccine_efficacy_with_vacine_data();
    }
   


    state = {
        number_of_people_with_astrazenica_1: 0,
        number_of_people_with_pfizer_1: 0,
        number_of_people_with_coronavac_1: 0,
        number_of_people_with_janssen_1: 0,
        number_of_people_with_astrazenica_2: 838633,
        number_of_people_with_pfizer_2: 123789,
        number_of_people_with_coronavac_2: 1765080,
        number_of_people_with_janssen_2:7,
        eficacia_pfizer_1: 0.487,
        eficacia_pfizer_2: 0.95,
        eficacia_astrazenica_1: 0.77,
        eficacia_astrazenica_2: 0.941,
        eficacia_coronavac_1:0,
        eficacia_coronavac_2: 0.507,
        eficacia_janssen_1: 0.669,
        eficacia_janssen_2: 0.669,
        vaccine_efficacy: 0.66,
        velocidade_vacinacao: 0.001,
        quantidade_infectados: 0,
        dias_nova_infeccao:10,
        random: 0,
        figure: '',
        domain: '',
        first_dose_efficacy: 0.5,
        second_dose_efficacy: 0.5,
        speed_first_dose: 9000,
        speed_second_dose: 9000,
       

        
        
   

        
    };

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ vaccine_efficacy: e.currentTarget.value });
    };




  
 

   


    resetIframe() {
        this.setState({ random: this.state.random + 1 });
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
            vaccine_efficacy: ((this.state.first_dose_efficacy *
                this.state.speed_first_dose) + (this.state.second_dose_efficacy *
                    this.state.speed_second_dose)) / (this.state.speed_first_dose +
                        this.state.speed_second_dose
                )

        });


        this.setState({
            velocidade_vacinacao:(this.state.speed_first_dose +
                        this.state.speed_second_dose
                )

        });


        this.resetIframe();

        console.log(this.state.vaccine_efficacy
        );

    }

    handleChange = (event, newValue) => {

       this.calc_vaccine_efficacy()
    };

    handleChange_first_dose_efficacy = (event, newValue) => {
        this.setState({ first_dose_efficacy: newValue });

        this.calc_vaccine_efficacy()
    };


    handleChange_first_dose_efficacy_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ first_dose_efficacy: event.target.value });

        this.calc_vaccine_efficacy()
        
    };


    handleChange_astrazenica_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_astrazenica_1: event.target.value })
        console.log('Number of people with astranenica');
        console.log(this.state.number_of_people_with_astrazenica_1);
        this.calc_vaccine_efficacy_with_vacine_data();
    };



    handleChange_pfizer_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_pfizer_1: event.target.value });
        this.calc_vaccine_efficacy_with_vacine_data();
    };



    handleChange_janssen_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_janssen_1: event.target.value });
        this.calc_vaccine_efficacy_with_vacine_data();
    };



    handleChange_coronavac_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_coronavac_1: event.target.value });
        this.calc_vaccine_efficacy_with_vacine_data();
    };


    handleChange_astrazenica_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_astrazenica_2: event.target.value });
        this.calc_vaccine_efficacy_with_vacine_data();
    };



    handleChange_pfizer_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_pfizer_2: event.target.value });
        this.calc_vaccine_efficacy_with_vacine_data();
    };



    handleChange_janssen_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_janssen_2: event.target.value });
        this.calc_vaccine_efficacy_with_vacine_data();
    };



    handleChange_coronavac_text_input_2 = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ number_of_people_with_coronavac_2: event.target.value });
        this.calc_vaccine_efficacy_with_vacine_data();
    };



    handleChange_second_dose_efficacy = (event, newValue) => {
        this.setState({ second_dose_efficacy: newValue });

        this.calc_vaccine_efficacy()
    };


    handleChange_second_dose_efficacy_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ second_dose_efficacy: event.target.value });

        this.calc_vaccine_efficacy()

    };

    handleChange_speed_first_dose = (event, newValue) => {
        this.setState({ speed_first_dose: newValue });

        this.calc_vaccine_efficacy()
    };

    handleChange_first_dose_speed_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ speed_first_dose: event.target.value });

        this.calc_vaccine_efficacy()

    };



    handleChange_speed_second_dose = (event, newValue) => {
        this.setState({ speed_second_dose: newValue });

        this.calc_vaccine_efficacy()
    };


    handleChange_second_dose_speed_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ speed_second_dose: event.target.value });

        this.calc_vaccine_efficacy()

    };

    handleChange_quantidade_infectados_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ quantidade_infectados: event.target.value });

       

    };


    handleChange_dias_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ dias_nova_infeccao: event.target.value });

        

    };


    handleChange_velocidade = (event, newValue) => {
        this.setState({ velocidade_vacinacao: newValue });
    };


    handleChange_quantidade_infectados = (event, newValue) => {
        this.setState({ quantidade_infectados: newValue });
    };

    handleChange_dias_nova_infeccao = (event, newValue) => {
        this.setState({ dias_nova_infeccao: newValue });

    };

    
     



  
    public render() {
        return (

            <React.Fragment >
                <div>


                  <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">

                            <TableBody>
                                <TableRow>
                                    <Card>
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
                                            <br/>
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
                                                <br/>

                                            </EquationOptions>
                                            
                                               Parametros do modelo:
                                                    beta (rate of infection)
                                                    ,gamma  (rate of removal)
                                                    ,alpha (vaccine efficacy)
                                                    ,mu (mortality rate) <br />

                                                Parâmetros:  beta = 9.76e-2; 
    gamma =7.81e-2;
    mu=1.9e-2; <br/>

                                                

                                        </CardContent>

                                    </Card>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Número de Pessoas com a vacina AstraZeneca (primeira dose):</TableCell>
                                    <TableCell align="left"><TextField value={this.state.number_of_people_with_astrazenica_1}
                                        onChange={this.handleChange_astrazenica_text_input} /></TableCell>
                                   
                                </TableRow>
                                <TableRow>
                                    <TableCell>Número de Pessoas com a vacina Pfizer (primeira dose):</TableCell>
                                    <TableCell align="left"><TextField value={this.state.number_of_people_with_pfizer_1}
                                        onChange={this.handleChange_pfizer_text_input} /></TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell>Número de Pessoas com a vacina Coronavac (primeira dose):</TableCell>
                                    <TableCell align="left"><TextField value={this.state.number_of_people_with_coronavac_1}
                                        onChange={this.handleChange_coronavac_text_input} /></TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell>Número de Pessoas com a vacina Janssen (para o calculo da eficácia ponderada da primeira dose):</TableCell>
                                    <TableCell align="left"><TextField value={this.state.number_of_people_with_janssen_1}
                                        onChange={this.handleChange_janssen_text_input} /></TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell>Número de Pessoas com a vacina AstraZeneca (segunda dose):</TableCell>
                                    <TableCell align="left"><TextField value={this.state.number_of_people_with_astrazenica_2}
                                        onChange={this.handleChange_astrazenica_text_input_2} /></TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell>Número de Pessoas com a vacina Pfizer (segunda dose):</TableCell>
                                    <TableCell align="left"><TextField value={this.state.number_of_people_with_pfizer_2}
                                        onChange={this.handleChange_pfizer_text_input_2} /></TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell>Número de Pessoas com a vacina Coronavac (segunda dose):</TableCell>
                                    <TableCell align="left"><TextField value={this.state.number_of_people_with_coronavac_2}
                                        onChange={this.handleChange_coronavac_text_input_2} /></TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell>Número de Pessoas com a vacina Janssen ( para o calculo da eficácia ponderada da segunda dose):</TableCell>
                                    <TableCell align="left"><TextField value={this.state.number_of_people_with_janssen_2}
                                        onChange={this.handleChange_janssen_text_input_2} /></TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell> Eficácia da Vacina (primeira dose):
                                           <Card>
                                            <CardContent>
                                                <Typography color="primary" variant="subtitle1"  gutterBottom>
                                                    Eficácia informada pelo usuário ou calculada de acordo com a equação:

                                             </Typography>
                                            <EquationOptions
                                                variables={defaultVariables}
                                                functions={defaultFunctions}
                                                errorHandler={defaultErrorHandler}
                                            >
                                                <Equation
                                                        value='((numero_vacinados_pfizer*eficacia_vacina_pfizer)+(numero_vacinados_AstraZeneca*eficacia_vacina_AstraZeneca)+(numero_vacinados_coronavac*eficacia_vacina_coronavac)+(numero_vacinados_janssen*eficacia_vacina_janssen))/ (numero_vacinados_pfizer+numero_vacinados_AstraZeneca+numero_vacinados_coronava+numero_vacinados_janssen)'
                                                />
                                              
                                            </EquationOptions>
                                            </CardContent>

                                        </Card>
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
                                   <Card>
                                            <CardContent>
                                                <Typography color="primary" variant="subtitle1" gutterBottom>
                                                    Eficácia informada pelo usuário ou calculada de acordo com a equação:

                                             </Typography>
                                                <EquationOptions
                                                    variables={defaultVariables}
                                                    functions={defaultFunctions}
                                                    errorHandler={defaultErrorHandler}
                                                >
                                                    <Equation
                                                        value='((numero_vacinados_pfizer*eficacia_vacina_pfizer)+(numero_vacinados_AstraZeneca*eficacia_vacina_AstraZeneca)+(numero_vacinados_coronavac*eficacia_vacina_coronavac)+(numero_vacinados_janssen*eficacia_vacina_janssen))/ (numero_vacinados_pfizer+numero_vacinados_AstraZeneca+numero_vacinados_coronava+numero_vacinados_janssen)'
                                                    />

                                                </EquationOptions>
                                            </CardContent>

                                        </Card>
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
                                <TableRow>
                                    <TableCell>  Velocidade de  Vacinação (primeira dose)(K pessoas por dia):</TableCell>
                                    <TableCell align="left">
                                        <TextField value={this.state.speed_first_dose}
                                            onChange={this.handleChange_first_dose_efficacy_text_input} /></TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}><Slider
                          
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
                                            onChange={this.handleChange_second_dose_efficacy_text_input} /></TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}><Slider

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
                                <TableRow>
                                    <TableCell>   Eficácia ponderada da vacina :
                                        <Card>
                                            <CardContent>
                                                <Typography color="primary" variant="subtitle1" gutterBottom>
                                                    Eficácia calculada de acordo com a equação:

                                             </Typography>
                                                <EquationOptions
                                                    variables={defaultVariables}
                                                    functions={defaultFunctions}
                                                    errorHandler={defaultErrorHandler}
                                                >
                                                    <Equation
                                                        value='((numero_vacinados_primeira_dose*eficacia_vacina_primeira_dose)+(numero_vacinados_segunda_dose*eficacia_vacina_segunda_dose))/ (numero_vacinados_primeira_dose+numero_vacinados_segunda_dose)'
                                                    />

                                                </EquationOptions>
                                            </CardContent>

                                        </Card>
                                     
                                    
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
                    <br/>


           


                 




                   

                    <button onClick={() => { this.resetIframe(); }}>Simular</button><br />

                    <iframe frameBorder="0" key={this.state.random} src={process.env.REACT_APP_BASE_URL_ + "/" + this.state.vaccine_efficacy + "/" + (this.state.velocidade_vacinacao / 9000000) + "/" + (this.state.quantidade_infectados / 9000000) + "/" + this.state.dias_nova_infeccao+"/0/"} width="90%"
                        height="2000px" scrolling="no" ></iframe>

                
                    
                </div>


            </React.Fragment >
        );
    }
}

ReactDOM.render(<FormSIRV />, document.getElementById("root"));
