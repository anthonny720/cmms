import React from 'react';
import {Document, Image, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import Logo from "../../assets/logo.png";
import {useSelector} from "react-redux";
import {filter, map, size} from "lodash";
import Humanize from "humanize-plus";

const styles = StyleSheet.create({
    image: {
        width: 70, borderRadius: 10, padding: "2px",

    }, section: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        borderLeft: "1px",
        flexDirection: "row",
        borderRight: "1px",
        borderBottom: "1px"
    }
});
const DownloadOT = ({item}) => {

    const tools = useSelector(state => state.Assets.tools)


    return (<PDFViewer style={{width: "100%", height: "100%"}}>
        <Document>
            {item && size(item) > 0 && item?.map((data, index) => (
                <Page key={index} size="A4" style={{padding: "12px", width: "100%"}}>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "6px",
                        gap: "24px",
                        border: "1px solid black",

                    }}>
                        <Image style={styles.image} src={Logo}/>
                        <Text style={{
                            fontSize: "18px", fontWeight: "extrabold", fontFamily: "Times-Roman",
                        }}>ORDEN DE TRABAJO - {data?.code_ot}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={{
                            fontSize: "12px", fontWeight: "extrabold", fontFamily: "Times-Roman", textAlign: "center",
                        }}>PLANTA: GREENBOX S.A.C. -BQ. LA FLORIDA, C. CENTRAL KM 39 ACOBAMBA </Text>
                    </View>
                    <View style={styles.section}> <Text style={{
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        textAlign: "center",
                        width: "35%",
                        borderRightWidth: "1px"
                    }}>Tipo de trabajo: {data?.type_name}</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            width: "35%",
                            borderRightWidth: "1px"
                        }}>Origen de la falla: {data?.failure_name}</Text>
                        <Text style={{
                            fontSize: "11px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            width: "30%"
                        }}>Fecha: {new Date(data?.date_report).toLocaleDateString('es-PE', {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                            hour12: true
                        })}</Text>
                    </View>
                    <View style={styles.section}> <Text style={{
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        textAlign: "center",
                        width: "50%"
                    }}>Equipo: {data?.physical_name}</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            borderLeftWidth: "1px",
                            width: "50%"
                        }}>Ubicación: {data?.facility}</Text>
                    </View>
                    <View style={[styles.section, {flexDirection: "column"}]}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "100%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "6px"
                        }}>Descripción o actividad: </Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "100%",
                            paddingHorizontal: "12px",
                            paddingBottom: "6px",
                            display: "block"

                        }}>
                            {data?.description}
                        </Text>
                    </View>
                    <View style={[styles.section, {paddingVertical: "2px", width: "100%", justifyContent: "none"}]}>
                        <View style={{display: "flex", width: "30%", alignItems: "center", justifyContent: "center",}}>
                            <Text style={{
                                fontSize: "12px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                            }}>TRABAJO REALIZADO</Text>
                        </View>
                        <View style={{display: "flex", width: "35%"}}>
                            <Text style={{
                                fontSize: "12px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                borderLeftWidth: "1px",
                                borderBottomWidth: "1px",
                            }}>FECHA DE INICIO</Text>
                            <Text style={{
                                fontSize: "12px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                borderLeftWidth: "1px",

                            }}>FECHA DE FIN</Text>
                        </View>
                        <View style={{display: "flex", width: "35%",}}>
                            <Text style={{
                                fontSize: "12px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                borderLeftWidth: "1px",
                                borderBottomWidth: "1px",
                            }}>{new Date(data?.date_start).toLocaleDateString('es-PE', {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                                hour12: true
                            })}</Text>
                            <Text style={{
                                fontSize: "12px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                borderLeftWidth: "1px",
                            }}>{new Date(data?.date_finish).toLocaleDateString('es-PE', {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                                hour12: true
                            })}</Text>
                        </View>
                    </View>
                    <View style={[styles.section, {flexDirection: "column"}]}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "100%",
                            display: "inline-block",
                            paddingHorizontal: "12px",
                            paddingVertical: "6px"
                        }}>Trabajos realizados: </Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "100%",
                            paddingHorizontal: "12px",
                            paddingBottom: "6px",
                            display: "block"

                        }}>
                            {data?.activities}
                        </Text>
                    </View>
                    <View style={[styles.section, {flexDirection: "col"}]}>
                        <Text style={{
                            paddingVertical: "2px",
                            backgroundColor: "rgba(0,0,0,0.1)",
                            width: "100%",
                            fontSize: "12px",
                            fontWeight: "bold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                        }}>PERSONAL DE MANTENIMIENTO</Text>
                        <View style={styles.section}>
                            <Text style={{
                                fontSize: "8px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                width: "60%",
                                paddingVertical: "2px"
                            }}>TÉCNICO RESPONSABLE</Text>
                            <Text style={{
                                fontSize: "8px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                borderLeftWidth: "1px",
                                width: "20%",
                                paddingVertical: "2px"
                            }}>FIRMA</Text>
                            <Text style={{
                                fontSize: "8px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                borderLeftWidth: "1px",
                                width: "20%",
                                paddingVertical: "2px"
                            }}>Costo</Text>
                        </View>
                        {data?.personnel?.map((item, index) => {
                            return (<View key={index}
                                          style={[styles.section, {
                                              display: 'flex', justifyContent: "center", alignItems: "center"
                                          }]}>
                                <Text style={{
                                    fontSize: "12px",
                                    fontWeight: "extrabold",
                                    fontFamily: "Times-Roman",
                                    textAlign: "center",
                                    width: "60%",
                                }}>

                                    {item?.name} {item?.time && "(" + item?.time + ")"}


                                </Text>
                                <View style={{
                                    width: "20%", borderRightWidth: "1px", borderLeftWidth: "1px",
                                }}>
                                    <Image style={{
                                        width: "60%", marginLeft: "20%"
                                    }} src={`${process.env.REACT_APP_API_URL}${item?.signature}`}></Image>
                                </View>
                                <Text style={{
                                    fontSize: "12px",
                                    fontWeight: "extrabold",
                                    fontFamily: "Times-Roman",
                                    textAlign: "center",
                                    borderLeftWidth: "1px",
                                    width: "20%"
                                }}>S/{Humanize.formatNumber(item?.cost, 2)}</Text>


                            </View>)
                        })}

                    </View>

                    <View style={[styles.section, {flexDirection: "col"}]}>
                        <Text style={{
                            paddingVertical: "2px",
                            backgroundColor: "rgba(0,0,0,0.1)",
                            width: "100%",
                            fontSize: "12px",
                            fontWeight: "bold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                        }}>RESPUESTOS Y MATERIALES USADOS Y/O REQUERIDOS</Text>
                        <View style={styles.section}>
                            <Text style={{
                                fontSize: "8px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                width: "60%",
                                paddingVertical: "2px"
                            }}>DESCRIPCIÓN</Text>
                            <Text style={{
                                fontSize: "8px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                borderLeftWidth: "1px",
                                width: "20%",
                                paddingVertical: "2px"
                            }}>CANTIDAD</Text>
                            <Text style={{
                                fontSize: "8px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                borderLeftWidth: "1px",
                                width: "20%",
                                paddingVertical: "2px"
                            }}>COSTO</Text>
                        </View>
                        {map(data?.resources_used, item => {
                            return (<View style={styles.section}>
                                <Text style={{
                                    fontSize: "12px",
                                    fontWeight: "extrabold",
                                    fontFamily: "Times-Roman",
                                    textAlign: "center",
                                    width: "60%"
                                }}>{item?.name}</Text>
                                <Text style={{
                                    fontSize: "12px",
                                    fontWeight: "extrabold",
                                    fontFamily: "Times-Roman",
                                    textAlign: "center",
                                    borderLeftWidth: "1px",
                                    width: "20%"
                                }}>{item?.quantity}</Text>
                                <Text style={{
                                    fontSize: "12px",
                                    fontWeight: "extrabold",
                                    fontFamily: "Times-Roman",
                                    textAlign: "center",
                                    borderLeftWidth: "1px",
                                    width: "20%"
                                }}>S/ {Humanize.formatNumber(item?.price, 2)}</Text>


                            </View>)
                        })}

                    </View>


                    <View style={[styles.section, {flexDirection: "col"}]}>
                        <Text style={{
                            paddingVertical: "2px",
                            backgroundColor: "rgba(0,0,0,0.1)",
                            width: "100%",
                            fontSize: "12px",
                            fontWeight: "bold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                        }}>HERRAMIENTAS Y OTROS USADOS Y/O REQUERIDOS</Text>
                        {map(data?.tools, t => {
                            const filteredTool = filter(tools, ['id', t])[0];

                            return (<Text style={{
                                fontSize: "12px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                width: "100%"
                            }}>• {filteredTool && filteredTool?.name}</Text>)
                        })}


                    </View>

                    <View style={styles.section}>
                        <Text style={{
                            paddingVertical: "2px",
                            backgroundColor: "rgba(0,0,0,0.1)",
                            width: "100%",
                            fontSize: "12px",
                            fontWeight: "bold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                        }}>OBSERVACIONES</Text>
                    </View>
                    <View style={[styles.section, {flexDirection: "column"}]}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            width: "100%",
                            paddingHorizontal: "12px",
                            paddingVertical: "6px",
                            display: "block"

                        }}>
                            {data?.observations}
                        </Text>
                    </View>
                    <View style={styles.section}> <Text style={{
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        textAlign: "center",
                        width: "100%",
                        backgroundColor: "rgba(0,0,0,0.1)",
                    }}>AUTORIZACIONES</Text>
                    </View>
                    <View style={[styles.section]}>
                        <View style={{
                            width: "20%", display: "flex", flexDirection: "column"
                        }}>
                            <Image style={{
                                width: "100%"
                            }} src={`${process.env.REACT_APP_API_URL}${data?.signature}`}></Image>
                            <Text style={{
                                fontSize: "7px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                width: "100%",
                                borderTopWidth: "1px"
                            }}>JEFE DE ÁREA - ROLY SILVA</Text>
                        </View>
                        {data?.signature_planner && <View style={{
                            width: "20%", display: "flex", flexDirection: "column"
                        }}>
                            <Image style={{
                                width: "100%",
                            }} alt={"supervisor"}
                                   src={`${process.env.REACT_APP_API_URL}${data?.signature_planner}`}></Image>

                            <Text style={{
                                fontSize: "7px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                width: "100%",
                                borderTopWidth: "1px",
                                textTransform: "uppercase"
                            }}>PLANNER - {data?.planner_name}</Text>
                        </View>}

                        {data?.signature_supervisor && <View style={{
                            width: "20%", display: "flex", flexDirection: "column"
                        }}>
                            <Image style={{
                                width: "100%",
                            }} alt={"supervisor"}
                                   src={`${process.env.REACT_APP_API_URL}${data?.signature_supervisor}`}></Image>

                            <Text style={{
                                fontSize: "7px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                width: "100%",
                                borderTopWidth: "1px",
                                textTransform: "uppercase"
                            }}>SUP. CALIDAD - {data?.supervisor_name}</Text>
                        </View>}
                    </View>
                    <View style={styles.section}> <Text style={{
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        textAlign: "start",
                        width: "100%",
                        backgroundColor: "rgba(0,0,0,0.1)",
                    }}>60–F-01-V5</Text>
                    </View>
                </Page>))}

        </Document>
    </PDFViewer>);
};

export default DownloadOT;
