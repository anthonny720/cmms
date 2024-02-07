import React from 'react';
import {Document, Image, Page, PDFViewer, StyleSheet, Text, View} from "@react-pdf/renderer";
import Logo from "../../assets/logo.png";
import {useSelector} from "react-redux";
import HeaderForm from "../util/HeaderForm";

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
const DocumentViewerRequirement = ({data, close}) => {
    const me = useSelector(state => state.Auth.user)

    return (<>
        <HeaderForm close={close}/>
        <PDFViewer style={{width: "100%", height: "100%"}}>
            <Document>
                <Page size="A4" style={{padding: "12px", width: "100%"}}>
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
                        }}>SOLICITUD DE COTIZACIÓN </Text>
                    </View>


                    <View style={styles.section}> <Text style={{
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        textAlign: "center",
                        width: "35%",
                        borderRightWidth: "1px"
                    }}>NOMBRE DEL SOLICITANTE: </Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            width: "65%",
                        }}>{me?.get_full_name}</Text>
                    </View>
                    <View style={styles.section}> <Text style={{
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        textAlign: "center",
                        width: "35%",
                        borderRightWidth: "1px"
                    }}>FECHA DE SOLICITUD: </Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            textTransform: "uppercase",
                            width: "65%",
                        }}>{new Date().toLocaleDateString('es-PE', {
                            day: "2-digit", weekday: 'long', month: '2-digit', year: "numeric"
                        })}</Text>
                    </View>

                    <View style={styles.section}> <Text style={{
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        textAlign: "center",
                        width: "10%"
                    }}>ITEM</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            borderLeftWidth: "1px",
                            width: "30%"
                        }}>TRABAJO</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            borderLeftWidth: "1px",
                            width: "60%"
                        }}>ESPECIFICACIONES</Text>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            borderLeftWidth: "1px",
                            width: "20%"
                        }}>CANTIDAD</Text>
                    </View>
                    {data && data.map((item, index) => {
                        return (<View style={styles.section}> <Text style={{
                            fontSize: "10px",
                            fontWeight: "light",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            width: "10%"
                        }}>{index + 1}</Text>
                            <Text style={{
                                fontSize: "10px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                borderLeftWidth: "1px",
                                width: "30%"
                            }}>{item?.work}</Text>
                            <Text style={{
                                fontSize: "10px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                borderLeftWidth: "1px",
                                width: "60%"
                            }}>{item?.product} - {item?.description}</Text>
                            <Text style={{
                                fontSize: "10px",
                                fontWeight: "extrabold",
                                fontFamily: "Times-Roman",
                                textAlign: "center",
                                borderLeftWidth: "1px",
                                width: "20%"
                            }}>{item?.quantity} {item?.unit_measurement}</Text>
                        </View>)
                    })}
                    <View style={styles.section}> <Text style={{
                        fontSize: "12px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        textAlign: "center",
                        width: "100%",
                        backgroundColor: "rgba(0,0,0,0.1)",
                    }}>AUTORIZACIONES </Text>
                    </View>
                    <View style={[styles.section, {paddingTop: 50}]}> <Text style={{
                        fontSize: "9px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        textAlign: "center",
                        width: "30%",
                        borderTopWidth: "1px"
                    }}>JEFE DE ÁREA - ROLY SILVA</Text>
                        <Text style={{
                            fontSize: "9px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            width: "30%",
                            borderTopWidth: "1px"
                        }}>GERENCIA - RICARDO MEZA</Text>
                        <Text style={{
                            fontSize: "9px",
                            fontWeight: "extrabold",
                            fontFamily: "Times-Roman",
                            textAlign: "center",
                            width: "30%",
                            borderTopWidth: "1px"
                        }}>COMPRAS - JORGE RIVAS</Text>
                    </View>
                    <View style={styles.section}> <Text style={{
                        fontSize: "7px",
                        fontWeight: "extrabold",
                        fontFamily: "Times-Roman",
                        textAlign: "start",
                        width: "100%",
                        backgroundColor: "rgba(0,0,0,0.1)",
                    }}>30-F-15-V01</Text>
                    </View>


                </Page>


            </Document>
        </PDFViewer></>);
};

export default DocumentViewerRequirement;
