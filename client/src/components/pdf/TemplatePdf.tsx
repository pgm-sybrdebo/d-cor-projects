import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { ReportForm, UploadImageCard } from "../../interfaces";
import logo from "../../assets/dcorprojectPdfImage.jpg";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 90,
    paddingHorizontal: 35,
  },
  logo: {
    width: 100,
  },
  heading: {
    border: "2px solid black",
    padding: 4,
    paddingTop: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  headingHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 9,
  },
  boldText: {
    fontSize: 9,
    fontWeight: 600,
  },
  underlineText: {
    textDecoration: "underline",
    fontSize: 9,
  },
  greenText: {
    color: "#00b300",
    fontSize: 9,
    textDecoration: "underline",
  },
  redText: {
    color: "#ff0000",
    fontSize: 9,
    textDecoration: "underline",
  },
  colorBox: {
    padding: 2,
    paddingLeft: 30,
    paddingRight: 30,
    border: "2px solid black",
    backgroundColor: "#eeab32",
    transform: "translateX(5)",
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  flexBoxSecondColumn: {
    marginLeft: 30,
  },
  flexBoxSecondColumnDesign: {
    marginLeft: 42,
  },
  flexBoxThirdColumn: {
    marginLeft: 20,
  },
  flexBoxThirdFourthColumn: {
    marginLeft: 20,
    marginTop: 10,
  },
  subtitleBox: {
    width: "100%",
    border: "2px solid black",
    padding: 2,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 9,
    marginLeft: 40,
  },
  content: {
    fontSize: 9,
    marginLeft: 40,
    marginRight: 40,
  },
  imagesContainer: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 40,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    maxHeight: 200,
    maxWidth: "50%",
    marginBottom: 10,
    marginLeft: 10,
  },
  endContainer: {
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 30,
    textAlign: "right",
    color: "grey",
  },

  footer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    left: 230,
    textAlign: "center",
    color: "grey",
  },
});

interface PdfProps {
  data: ReportForm;
  reportNumber: number;
  projectName: string;
  clientName: string;
  projectStreet: string;
  projectCity: string;
  projectHouseNumber: number;
}

interface DesignerValues {
  designerId: number;
  companyName: string;
  firstName: string;
  lastName: string;
  gender: number;
  email: string;
  gsm: string;
  text: string;
  images: UploadImageCard[];
}

interface SubcontractorValues {
  subcontractorId: number;
  companyName: string;
  text: string;
  images: UploadImageCard[];
}

export function PdfDocument({
  data,
  reportNumber,
  projectName,
  clientName,
  projectStreet,
  projectHouseNumber,
  projectCity,
}: PdfProps) {
  Font.register({
    family: "Open Sans",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
      },
      {
        src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
        fontWeight: 600,
      },
    ],
  });

  const getDateFormat = (n: number) => {
    return n.toString().padStart(2, "0");
  };

  const getDatePdf = (date: Date) => {
    return [
      getDateFormat(date.getDate()),
      getDateFormat(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  };

  const getGsmFormat = (gsm: string) => {
    const newSting =
      gsm.slice(0, 3) +
      " " +
      gsm.slice(3, 6) +
      " " +
      gsm.slice(6, 8) +
      " " +
      gsm.slice(8, 10) +
      " " +
      gsm.slice(10, 12);
    return newSting;
  };
  return (
    <Document>
      <Page style={styles.body}>
        <Image src={logo} style={styles.logo} />
        <View style={styles.heading}>
          <View style={styles.headingHeading}>
            <Text style={styles.text}>Werfverslag</Text>
            <Text style={styles.text}>dd. {getDatePdf(new Date())}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>Project: {projectName}</Text>
            <View style={styles.colorBox}>
              <Text style={styles.boldText}>
                werfverslag nr. {reportNumber}
              </Text>
            </View>
          </View>
          <Text style={styles.text}>
            Adres: {projectStreet} nr. {projectHouseNumber} te {projectCity}
          </Text>
          <View style={styles.headingHeading}></View>
        </View>
        <View style={styles.heading}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.text}>Bouwheer: {clientName}</Text>
          </View>
          <View style={styles.flexBox}>
            <View>
              <Text style={styles.text}>Coördinatie:</Text>
            </View>
            <View style={styles.flexBoxSecondColumn}>
              <Text style={styles.text}>D-Corprojects</Text>
              <Text style={styles.text}>Dhr. De Backere Lieven</Text>
            </View>
            <View style={styles.flexBoxThirdColumn}>
              <Text style={styles.text}>GSM: 0496/52 73 32</Text>
              <Text style={styles.underlineText}>lieven@d-corprojects.be</Text>
            </View>
          </View>

          {data.designers.map((designer: DesignerValues) => (
            <View style={styles.flexBox}>
              <View>
                <Text style={styles.text}>Ontwerp:</Text>
              </View>
              <View style={styles.flexBoxSecondColumnDesign}>
                <Text style={styles.text}>{designer.companyName}</Text>
                <Text style={styles.text}>
                  {designer.gender === 0 ? "Dhr." : "Mevr."} {designer.lastName}{" "}
                  {designer.firstName}
                </Text>
              </View>
              <View style={styles.flexBoxThirdColumn}>
                <Text style={styles.text}>
                  GSM: {getGsmFormat(designer.gsm)}
                </Text>
                <Text style={styles.underlineText}>{designer.email}</Text>
              </View>
            </View>
          ))}
          <Text style={styles.text}>
            Gelieve ons per kerende te contacteren indien deze e-mail
            onduidelijkheden bevat.
          </Text>
        </View>
        <Text style={styles.text}>Gelieve nota te nemen van volgende aub:</Text>
        <View style={styles.subtitleBox}>
          <Text style={styles.subtitle}>Algemeen</Text>
        </View>
        <Text style={styles.text}>
          Datum werfvergadering: {getDatePdf(data.startDate)}
        </Text>
        <Text style={styles.text}>
          Datum volgende werfvergadering: {getDatePdf(data.nextDate)}
        </Text>
        <View style={styles.subtitleBox}>
          <Text style={styles.subtitle}>Algemene info</Text>
        </View>
        <Text style={styles.content}>{data.generalInfo}</Text>
        <View style={styles.subtitleBox}>
          <Text style={styles.subtitle}>D-Corprojects</Text>
        </View>
        <Text style={styles.content}>{data.dcorprojectsInfo}</Text>
        <View style={styles.subtitleBox}>
          <Text style={styles.subtitle}>Bouwheer</Text>
        </View>
        <Text style={styles.content}>{data.clientInfo}</Text>
        <View style={styles.imagesContainer}>
          {data.clientImages.map((image: UploadImageCard, index: number) => (
            <Image
              key={index}
              src={`${process.env.REACT_APP_GET_PROJECT_IMAGE}${image.filename}`}
              style={styles.image}
            />
          ))}
        </View>

        {data.designers.map((designer: DesignerValues) => (
          <>
            <View style={styles.subtitleBox}>
              <Text style={styles.subtitle}>{designer.companyName}</Text>
            </View>
            <Text style={styles.content}>{designer.text}</Text>
            <View style={styles.imagesContainer}>
              {designer.images.map((image: UploadImageCard, index: number) => (
                <Image
                  key={index}
                  src={`${process.env.REACT_APP_GET_PROJECT_IMAGE}${image.filename}`}
                  style={styles.image}
                />
              ))}
            </View>
          </>
        ))}

        {data.subcontractors.map((subcontractor: SubcontractorValues) => (
          <>
            <View style={styles.subtitleBox}>
              <Text style={styles.subtitle}>{subcontractor.companyName}</Text>
            </View>
            <Text style={styles.content}>{subcontractor.text}</Text>
            <View style={styles.imagesContainer}>
              {subcontractor.images.map(
                (image: UploadImageCard, index: number) => (
                  <Image
                    key={index}
                    src={`${process.env.REACT_APP_GET_PROJECT_IMAGE}${image.filename}`}
                    style={styles.image}
                  />
                )
              )}
            </View>
          </>
        ))}
        <View style={styles.endContainer}>
          <Text style={styles.underlineText}>Verloop der Werken</Text>
          <Text style={styles.underlineText}>
            Planning der werken werd naar alle betrokken partijen doorgemaild
          </Text>
          <Text style={styles.greenText}>
            Gelieve planning stipt op te volgen
          </Text>
          <Text style={styles.text}>Veiligheid (PBM) strikt opvolgen.</Text>
          <Text style={styles.text}>
            Alle facturen en vorderingstaten moeten eerst ter goedkeuring
            voorgelegd worden aan D-Corprojects.
          </Text>
          <Text style={styles.underlineText}>
            Gelieve dagelijks alles op te ruimen, alsook alle drank en eetresten
            en dit voor jullie eigen veiligheid.
          </Text>
          <Text style={styles.text}>
            De opdrachtgever en hoofdaannemer staan erop dat de werf proper
            wordt achtergelaten en dat alle , vuiligheid dagelijks wordt
            verwijderd en afgevoerd(controle door bouwheer & projectleider .) De
            werf moet telkens afgesloten worden zowel 's avonds als wanneer
            overdag niemand aanwezig is. Onbevoegde personen worden niet
            toegelaten op de werf.
          </Text>
          <Text style={styles.redText}>Er wordt niet gerookt op de werf.</Text>
        </View>
        <View style={styles.footer} fixed>
          <Text style={styles.text}>D-Corprojects</Text>
          <Text style={styles.text}>rue Deflière 52</Text>
          <Text style={styles.text}>B*7750 Orroir</Text>
          <Text style={styles.text}>Email: lieven@d-corprojects.be</Text>
          <Text style={styles.text}>Tel: GSM: 0496 52 73 32</Text>
        </View>
        <Text
          fixed
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
