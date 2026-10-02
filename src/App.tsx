import { useState, useEffect } from 'react';
// @ts-ignore
import { ArrowLeft, Home, MessageSquareQuote, Coins } from 'lucide-react';

const LANGUAGES = [
  { id: 'de', name: 'Deutsch', germanCountry: 'Deutschland', countryCode: 'de' },
  { id: 'en', name: 'English', germanCountry: 'Großbritannien / Englisch', countryCode: 'gb' },
  { id: 'fr', name: 'Français', germanCountry: 'Frankreich', countryCode: 'fr' },
  { id: 'es', name: 'Español', germanCountry: 'Spanien', countryCode: 'es' },
  { id: 'it', name: 'Italiano', germanCountry: 'Italien', countryCode: 'it' },
  { id: 'ru', name: ' Русский', germanCountry: 'Russland', countryCode: 'ru' },
  { id: 'pl', name: 'Polski', germanCountry: 'Polen', countryCode: 'pl' },
  { id: 'ro', name: 'Româna', germanCountry: 'Rumänien', countryCode: 'ro' },
  { id: 'tr', name: 'Türkçe', germanCountry: 'Türkei', countryCode: 'tr' },
  { id: 'sl', name: 'Slovenšcina', germanCountry: 'Slowenien', countryCode: 'si' },
  { id: 'hu', name: 'Magyar', germanCountry: 'Ungarn', countryCode: 'hu' },
  { id: 'uk', name: ' українська', germanCountry: 'Ukraine', countryCode: 'ua' },
  { id: 'hi', name: ' भारतीय', germanCountry: 'Indien', countryCode: 'in' },
  { id: 'bg', name: ' български', germanCountry: 'Bulgarien', countryCode: 'bg' },
  { id: 'cs', name: 'Ceština', germanCountry: 'Tschechien', countryCode: 'cz' },
  { id: 'lt', name: 'Lietuviu', germanCountry: 'Litauen', countryCode: 'lt' },
  { id: 'nl', name: 'Nederlands', germanCountry: 'Niederlande', countryCode: 'nl' },
  { id: 'hr', name: 'Hrvatski', germanCountry: 'Kroatien', countryCode: 'hr' },
];

const TEXT_DATABASE = {
  de: {
    security_deposit: ` Hinweise/Belehrung zur Niederschrift über eine Sicherheitsleistung:

1 Angabe Ihrer Personalien als Beschuldigte(r)/Betroffene(r).

2 Angabe der Straftat/Ordnungswidrigkeit, die Ihnen vorgeworfen wird, der für die Sicherheitsleistung zuständigen Behörde sowie deren Bankverbindung und Kassenzeichen.

3 Da Sie im Geltungsbereich des betreffenden Gesetzes keinen festen Wohnsitz oder Aufenthalt haben
– können Sie zur Abwendung Ihrer Festnahme (§ 127a Strafprozessordnung [StPO])
– müssen Sie zur Sicherstellung des Straf-/Bußgeldverfahrens (§ 132 StPO), § 46 des Gesetzes über Ordnungswidrigkeiten (OWiG)
für die zu erwartende Geldstrafe/Geldbuße sowie für die Kosten des Verfahrens eine Sicherheit leisten. Die Sicherheit kann, falls Sie nicht über Euro verfügen, in einer anderen konvertierbaren Währung, in Wertpapieren, durch Pfandbestellung oder durch Bürgschaft geeigneter Dritter geleistet werden.

Wenn Sie im Falle des § 132 StPO die Sicherheitsleistung nicht freiwillig erbringen und eine/einen Zustellungsbevollmächtigte(n) nicht benennen, werden Beförderungsmittel oder andere Gegenstände, die Sie mit sich führen und die Ihnen gehören, beschlagnahmt. Sie können hierzu jederzeit beim zuständigen Amtsgericht die richterliche Entscheidung beantragen (§ 132 Abs. 3 i.V.m. § 98 Abs. 2 StPO). Sie haben die Möglichkeit, die beschlagnahmten Gegenstände durch Überweisung der Sicherheitsleistung auf das unter Nr. 2 angegebene Konto und ggf. durch nachträgliche Benennung einer/eines Zustellungsbevollmächtigten (s. Nr. 4) wieder auszulösen.

Der Geldbetrag bzw. die Gegenstände werden an die zuständige Behörde abgegeben. Im Falle der rechtskräftigen Ahndung wird die Sicherheitsleistung mit der Geldstrafe/-buße und den Kosten des Verfahrens verrechnet sowie die ggf. beschlagnahmten Sachen verwertet. Wird keine oder eine Geldstrafe/-buße in geringerer Höhe festgesetzt, so wird der verbleibende Betrag oder die Sache an Sie zurückgegeben.

4 Sie bennanten, eine im zuständigen Gerichtsbezirk wohnende Person als „Zustellungsbevollmächtigtenʻʻ. Sie empfängt für Sie die Schriftstücke der Staatsanwaltschaft/des Gerichts und stellt Ihnen diese zu. Der Zustellungsbevollmächtigte ist ausschließlich für eine Übersendung von amtlichen Schriftstücken an den Vollmachtgeber zuständig und nimmt keine Schriftstücke des Vollmachtgebers entgegen. Die Vollmacht erstreckt sich ausdrücklich auch auf die Empfangnahme von Ladungen Ihrer Person zur gerichtlichen Hauptverhandlung und anderen gerichtlichen an beraumten Terminen.
„Sie wurde darüber belehrt, dass falls die Staatsanwaltschaft oder das Gericht beabsichtigen, das Verfahren durch Strafbefehl einzustellen, sie das Recht nach Art. 6 (3) lit.a EMRK haben, zusätzlich zum deutschen Strafbefehl eine Übersetzung in ihrer Hauptsprache erhalten.“ 
Belehrung gemäß § 153a StPO:
„Sie wurden darüber belehrt, dass die Staatsanwaltschaft mit Ihrer Zustimmung gemäß § 153a Abs. 1 der Strafprozessordnung (StPO) von einer Anklageerhebung gegen Zahlung einer Buße in Höhe der von Ihnen aufgebrachten Sicherheitsleistung zugunsten der Staatskasse absehen kann. Außerdem wurde Ihnen eröffnet, dass die Tat sodann nicht mehr als Vergehen bestraft wird, sondern das Verfahren, ohne dass zusätzliche Kosten entstehen und eine Eintragung in das Bundeszentralregister erfolgt, endgültig eingestellt wird.
Als Beschuldigte(r) die/der darüber hinaus belehrt wurde, dass andernfalls die öffentliche Klage gegen sie/ihn erhoben werden kann, sind Sie mit der Einstellung des Verfahrens und der von Ihnen aufgebrachten Sicherheitsleistung als Buße gemäß § 153a Abs. 1 StPO einverstanden."

Geben Sie bitte für den Fall, dass ein verbleibender Betrag an Sie zurückgegeben werden muss, ggf. Ihre/eine andere Bankverbindung an.

5 Sie bestätigen mit Ihrer Unterschrift, eine Durchschrift der „Niederschrift über eine Sicherheitsleistung“ und dieses Hinweis-/Belehrungsblatt erhalten zu haben. Die/Der Polizeibeamtin/Polizeibeamte bestätigt durch Unterschrift den Empfang der von Ihnen geleisteten Sicherheit.`

  },
  en: { 
    security_deposit: ` Information/Instruction on the Bail Payment Recording Process:

 1 You are required to give your particulars as the party charged with an offence/the party affected. 

2 You are required to give details of the criminal/non-criminal offence with which you are charged, the authority responsible for the bail payment, and the latter's bank account details and transaction number. 

3 You do not have a fixed abode or residence within the scope of the relevant law therefore:

– you may make a bail payment in order to avoid detention (art. 127a of the German Code of Criminal Procedure (StPO))

– you must make a bail payment to provide security for the criminal/summary proceedings (art. 132 of the German Code of Criminal Procedure (StPO), art. 46 of the German Administrative Offences Act (OWiG))

in respect of the anticipated fine/penalty and in respect of the costs of the proceedings. If you cannot pay in euro, the payment may be made in another convertible currency, in securities, or by way of surety or guarantee provided by appropriate third parties. 

If you do not volunteer the bail payment under art. 132 of the German Code of Criminal Procedure (StPO) and do not name an authorised recipient then your means of transport or other objects which you have with you and which belong to you will be seized. You may request that the judicial decision be made by the district court in this matter at any time (art. 132 para. 3 in conjunction with art. 98 para. 2 of the German Code of Criminal Procedure (StPO)). You may retrieve the confiscated objects by remitting the bail payment to the account specified in section 2 and, where applicable, by naming an authorised recipient (cf. section 4). 

The money and/or objects shall be ceded to the competent authority. In the event of a legally binding penalty, the bail shall be set off against the fine/penalty and against the costs of the proceedings and, where applicable, against the confiscated items. If no fine/penalty is imposed, or if you are fined a lower amount, then the remaining amount or the item shall be returned to you. 

4 You have appointed a person residing within the relevant judicial district as your ‘authorised representative for service of process’. This person will receive documents from the public prosecutor’s office or the court on your behalf and forward them to you. The authorised representative is solely responsible for forwarding official documents to the principal and will not accept any documents from the principal. The power of attorney also expressly covers the receipt of summonses addressed to you personally for the main court hearing and other court dates scheduled by the court.
“You have been informed that, should the public prosecutor’s office or the court intend to discontinue the proceedings by means of a penalty order, you have the right under Article 6(3)(a) of the ECHR to receive a translation into your main language in addition to the German penalty order.”

Translated with DeepL.com (free version)
 Instruction under art. 153a of the German Code of Criminal Procedure (StPO): "You have been informed that the public prosecution department may refrain from indictment under art. 153a para. 1 of the German Code of Criminal Procedure (StPO) subject to your consent and subject to the payment of the applicable amount of bail to public funds by way of a fine. You have also been informed that the action will then not be treated as a punishable offence but that there will be a final stay of proceedings without incurring additional costs and without an entry being made in the Federal Central Register of Convictions. 

Having been informed that public charges may be pressed against you in your capacity as the accused, you consent to the stay of proceedings and the bail payment by way of a fine under art. 153a para. 1 of the German Code of Criminal Procedure (StPO)." 

Please give the details of your bank account or a different bank account in case there is an amount left over which must be repaid to you. 

5 On signing this document you are confirming receipt of a copy of the "Bail Payment Record" and this information/ instruction sheet. The police officer signs to acknowledge receipt of your bail payment.`
  },
  fr: { 
    security_deposit: ` Information sur le procès-verbal de dépôt de caution: 

1 Indication de votre identité en tant que prévenu(e) / intéressé(e). 

2 Indication du délit/de l'infraction administrative qui vous est reproché(e), de l'administration compétente pour le dépôt de la caution, de ses coordonnées bancaires et de la référence de la transaction. 

3 Étant donné que vous n'avez pas de domicile ou de lieu de résidence fixe sur le territoire d'application de la loi en question,

– vous pouvez, pour éviter votre arrestation (§ 127a du code de procédure pénale [StPO]),

– vous devez, pour garantir le bon déroulement de la procédure pénale / d'amende (§ 132 du StPO), en vertu du § 46 de la loi sur les infractions (OWiG), 
verser une caution destinée à couvrir l'amende à prévoir et les coûts de la procédure. Au cas où vous ne disposeriez pas d'argent en euros, la caution peut être versée dans une autre monnaie convertible, sous forme de titres, de gage ou de garantie de la part d'un tiers qualifié. 

Conformément au § 132 du StPO, à défaut de dépôt volontaire de la caution et de désignation d'un domiciliataire, le véhicule ou d'autres objets se trouvant en votre possession et qui vous appartiennent seront saisis. À ce sujet, vous pouvez à tout moment requérir une décision de justice auprès du tribunal compétent (§ 132 alinéa 3, associé au § 98 alinéa 2 du StPO). Vous avez la possibilité de récupérer les objets saisis en effectuant un virement de la caution sur le compte dont les références figurent à la section nº2 et, le cas échéant, en désignant ultérieurement un domiciliataire (cf. section no 4). 

La somme d'argent ou les objets seront remis à l'administration compétente. En cas de sanction exécutoire, la caution sera déduite de l'amende et des frais de procédure, et les objets éventuellement saisis seront liquidés. Si aucune amende n'est arrêtée ou si elle est d'un montant moindre que la caution, la somme restante ou les objets restants vous seront rendus. 

4 Vous avez désigné une personne résidant dans le ressort judiciaire compétent comme « mandataire chargé de la signification ». Celle-ci réceptionne pour votre compte les documents émanant du parquet ou du tribunal et vous les transmet. Le mandataire chargé de la signification est exclusivement chargé de transmettre les documents officiels au mandant et ne réceptionne aucun document provenant de ce dernier. La procuration s’étend expressément à la réception des citations à comparaître qui vous sont adressées pour l’audience principale et pour d’autres dates fixées par le tribunal.
« Elle a été informée que si le parquet ou le tribunal a l’intention de classer l’affaire par ordonnance pénale, elle a le droit, en vertu de l’article 6, paragraphe 3, point a), de la CEDH, de recevoir, en plus de l’ordonnance pénale allemande, une traduction dans sa langue principale. »

Traduit avec DeepL.com (version gratuite) 
Information en vertu du § 153a du StPO : 
« Vous avez été informé(e) que la magistrature du parquet peut, avec votre accord et en vertu du code de procédure pénale (StPO), § 153a, alinéa 1, rejeter une mise en accusation moyennant le paiement au Trésor public d'une amende s'élevant au montant de la caution que vous avez fournie. Il vous a en outre été expliqué que, dans ce cas, les faits ne seront plus sanctionnés comme un délit mais que la procédure sera classée sans suite, sans occasionner de frais supplémentaires ni de mention au casier judiciaire national. 

En tant que prévenu(e) ayant été informé(e) en outre que, à défaut, une action publique pourrait être introduite contre vous, vous êtes d'accord pour un arrêt de la procédure et pour un versement de la caution que vous avez fournie au titre d'amende, en vertu du § 153a alinéa 1 du StPO. » 

Veuillez indiquer les références de votre (ou d'un autre) compte bancaire, pour le cas où un montant excédentaire devrait vous être remboursé. 

5 Par votre signature, vous confirmez avoir reçu une copie du document intitulé « Procès-verbal de dépôt de caution » ainsi que le présent formulaire d'information. L'agent de police accuse réception de votre caution en signant à son tour..`
  },
  
  es: { 
    security_deposit: ` Notas/instrucción relativa al escrito sobre un depósito de garantía: 

1 Indicación de sus datos personales como acusado(a)/afectado(a). 

2 Indicación del delito/infracción del reglamento que le ha sido imputado, de la autoridad competente en relación al depósito de garantía, así como de la cuenta bancaria y el número de referencia. 

3 Debido a que usted carece de domicilio o residencia fija, en relación al ámbito de aplicación de las leyes correspondientes

– podrá usted, con objeto de evitar su detención (art. 127a del Código alemán de Enjuiciamiento Criminal [StPO]),

– debe usted, con objeto de garantizar la ejecución del proceso penal/sancionador (art. 132 StPO), art. 46 de la Ley alemana de contravenciones e infracciones administrativas (OWiG), 

presentar un depósito de garantía en relación a la sanción pecuniaria/multa pecuniaria, así como en relación a los gastos del procedimiento. En caso de que no disponga de euros, el depósito de garantía podrá presentarse en una divisa convertible diferente, en valores, así como por pignoración o aval de una tercera parte adecuada. 

En caso de que, en virtud del art. 132 StPO, usted no presente voluntariamente el depósito de garantía y no nombre a un/una apoderado(a) a efectos de notificación, se procederá a la incautación de los medios de automoción u otros objetos que traiga consigo y le pertenezcan. En este sentido y en cualquier momento, podrá usted solicitar la resolución judicial pertinente en el juzgado de primera instancia e instrucción correspondiente (art. 132 párr. 3 y art. 98 párr. 2 StPO). Tendrá la opción de recuperar los objetos incautados, siempre y cuando ingrese el depósito de garantía en la cuenta bancaria indicada en el nº 2 mediante transferencia bancaria y, si fuera necesario, nombre posteriormente a un/una apoderado(a) a efectos de notificación (consulte nº 4). 

El importe dinerario o los objetos serán entregados a las autoridades competentes. En caso de que, finalmente, se ejecute la penalización jurídica, el depósito de garantía se compensará con la sanción/multa pecuniaria. y los gastos del procedimiento, o se procederá a emplear los bienes incautados para dicha compensación. En caso de que no se imponga sanción alguna o se imponga una sanción/multa pecuniaria de inferior valor, le será devuelto el importe restante o los bienes correspondientes. 

4 Usted ha designado a una persona residente en la jurisdicción competente como «apoderado para la recepción de notificaciones». Esta persona recibirá en su nombre los documentos de la Fiscalía o del tribunal y se los remitirá a usted. El apoderado para la recepción de notificaciones se encarga exclusivamente de remitir los documentos oficiales al poderdante y no acepta ningún documento procedente de este. El poder se extiende expresamente también a la recepción de citaciones dirigidas a su persona para la vista principal y otras citas judiciales fijadas.
«Se le ha informado de que, en caso de que la Fiscalía o el tribunal tengan la intención de archivar el procedimiento mediante un auto de sentencia, tiene derecho, con arreglo al artículo 6, apartado 3, letra a), del CEDH, a recibir, además del auto de sentencia alemán, una traducción a su lengua materna».


Traducción realizada con la versión gratuita del traductor DeepL.com

Instrucción en virtud del art. 153a StPO: "Ha sido usted informado de que la fiscalía, previo consentimiento expreso por su parte y en virtud del art. 153a párr. 1 del Código alemán de Enjuiciamiento Criminal (StPO), podrá prescindir de ejecutar el procesamiento previo pago de una multa que ascienda al importe del depósito de garantía presentado por usted en beneficio del erario público. Además, también se le ha notificado, que el hecho ya no será castigado como un delito, sino que el procedimiento será finalmente sobreseído, sin que surjan gastos adicionales o se proceda a realizar una inscripción en el Registro Federal Central. 
Como acusado(a) que ha sido informado(a) de que, en caso contrario, se podría presentar una acusación pública contra su persona, se declara usted de acuerdo con el sobreseimiento del procedimiento y la presentación de un depósito de garantía por su parte y a modo de multa en virtud del art. 153a párr. 1 StPO)". 

Por favor, en caso de que reste un importe que le deba ser devuelto, indique un número de cuenta bancaria. 

5 Por la presente y mediante su firma, confirma usted haber recibido una copia del documento "Escrito sobre un depósito de garantía" y una hoja informativa sobre las notas/instrucción. El/la agente policial confirma mediante su firma la recepción del depósito de garantía presentado por usted.`
  },
  it: { 
    security_deposit: ` Informazioni/ammonimento relativi al verbale sulla cauzione: 

1 Comunicazione dei Suoi dati personali in quanto accusato/a/persona coinvolta. 

2 Comunicazione del reato penale/illecito amministrativo oggetto dell'accusa, delle autorità competenti per la cauzione nonché relative coordinate bancarie e del riferimento del versamento. 

3 Dal momento che Lei non ha una residenza o dimora fissa nell'ambito di applicazione della legge in questione,

– per evitare l'arresto (§ 127a del Codice di Procedura Penale tedesco StPO) ha la facoltà di

– per garantire il procedimento penale/per infrazioni amministrative (§ 132 del Codice di Procedura Penale tedesco - StPO), § 46 della Legge tedesca sulle contravvenzioni (OWiG), è tenuto/a a 
corrispondere una cauzione per la pena pecuniaria/sanzione prevista nonché per i costi del procedimento. Se non dispone di Euro, la cauzione può essere versata in un'altra valuta convertibile, in titoli, tramite costituzione in pegno o fideiussione di Terzi aventi i requisiti necessari. 

Qualora nel caso di cui al § 132 del Codice di procedura penale tedesco (StPO) Lei non versi volontariamente la cauzione e non nomini un/una domiciliatario/a, verranno confiscati i mezzi di trasporto o altri oggetti che porta con sé e che Le appartengono. A tal proposito, Lei ha la facoltà di appellarsi in qualsiasi momento al Tribunale di prima istanza competente in materia (§ 132 comma 3 associato al. § 98 comma 2 del Codice di Procedura Penale tedesco - StPO). Ha la possibilità di riscattare gli oggetti confiscati versando la cauzione tramite bonifico al conto indicato al punto 2 ed eventualmente nominando successivamente un/una domiciliatario/a (vedere punto 4). 

La somma in denaro o gli oggetti vengono consegnati all'autorità competente. In caso di sanzione con effetto di cosa giudicata, la cauzione viene compensata con la pena pecuniaria/sanzione e con i costi del processo, e vengono realizzati gli eventuali oggetti confiscati. Qualora non venga stabilita alcuna pena pecuniaria/sanzione o la pena pecuniaria/sanzione abbia un valore inferiore, l'importo rimanente o gli oggetti Le verranno restituiti. 

4 Lei ha designato una persona residente nel distretto giudiziario competente come “rappresentante legale per le notifiche”. Quest’ultima riceve per suo conto gli atti della Procura/del Tribunale e glieli consegna. Il rappresentante legale per le notifiche è responsabile esclusivamente dell’invio di atti ufficiali al mandante e non riceve alcun documento proveniente dal mandante. La procura si estende espressamente anche alla ricezione delle citazioni a comparire in udienza principale e ad altri termini fissati dal tribunale.
«Le è stato spiegato che, qualora la Procura o il tribunale intendano archiviare il procedimento mediante decreto penale, lei ha il diritto, ai sensi dell’art. 6, comma 3, lett. a) della CEDU, di ricevere, oltre al decreto penale tedesco, una traduzione nella sua lingua principale.»

Ammonimento ai sensi del § 153a del Codice di Procedura penale tedesco (StPO): "Lei è stato/a messo al corrente del fatto che con il Suo consenso conformemente al § 153a comma 1 del Codice di Procedura Penale tedesco (StPO), la Pubblica Accusa può prescindere dalla promozione dell'accusa in cambio del versamento di una sanzione dell'ammontare della cauzione applicatale a favore dell'erario. Le è stato inoltre comunicato che in questo modo il reato non verrà più sanzionato come delitto, ma il procedimento verrà archiviato definitivamente senza che ne derivino costi aggiuntivi e senza alcuna registrazione nel Registro centrale federale. In qualità di accusato/a informato del fatto che in caso contrario può essere intentata a Suo carico un'azione penale, Lei acconsente all'archiviazione del procedimento e al versamento della cauzione come sanzione ai sensi del § 153a comma 1 del Codice di Procedura Penale tedesco (StPO)." 

Indichi le Sue coordinate bancarie (o delle coordinate bancarie di Terzi) per la restituzione di un eventuale importo rimanente. 

5 Con la Sua firma conferma di aver ricevuto una copia del "Verbale sulla cauzione" e il presente foglio di istruzioni e ammonimento. L'autorità di polizia conferma con una firma la ricezione della cauzione da Lei versata.`
  },
  ru: { 
    security_deposit: ` Указания/разъяснение к протоколу о внесение залога в качестве меры пресечения:

1 Сообщение Ваших личных данных в качестве обвиняемой(го)/лица, которого это касается.

2 Указание на уголовно наказуемое деяние/нарушение общественного порядка, которое вменяется Вам, органом, компетентным в отношении внесения залога в качестве меры пресечения, а также его банковских реквизитов и номеров счетов. 

3 Поскольку Вы в сфере действия соответствующего закона не имеете постоянного места жительства или пребывания

– Вы можете во избежание Вашего задержания (§ 127a Уголовно-процессуального кодекса [StPO])

– Вы должны в целях обеспечения проведения производства по уголовному делу/наложению денежного штрафа (§ 132 Уголовно-процессуального кодекса (StPO)), § 46 Закона об административных правонарушениях (OwiG)

внести залог для покрытия ожидаемого денежного штрафа/ущерба потерпевшего, а также издержек на производство по делу. Залог может быть внесен, если Вы не располагаете евро, в другой конвертируемой валюте, ценными бумагами, путем установления залога на движимое имущество или поручительства со стороны подходящего третьего лица.

Если Вы в случае, предусмотренном § 132 Уголовно-процессуального кодекса (StPO), добровольно не внесете залог в качестве меры пресечения и не назовете лицо, уполномоченное принимать документы в установленном порядке, будут конфискованы транспортные средства или другие предметы, которыми Вы пользуетесь, и которые Вам принадлежат. Вы для этого в любое время можете ходатайствовать перед компетентным судом первой инстанции о принятии судебного решения (§ 132 абз. 3 в сочетании с § 98 абз. 2 Уголовно-процессуального кодекса (StPO)). У Вас имеется возможность путем перечисления суммы залога в качестве меры пресечения на указанный в п. № 2 счет и при необходимости путем последующего названия лица, уполномоченного принимать документы в установленном порядке (см. п. № 4), выкупить конфискованные предметы.

Денежная сумма или предметы сдаются в уполномоченный орган. В случае уголовного преследования в соответствии с законом залог в качестве меры пресечения пойдет в зачет денежного штрафа/суммы ущерба потерпевшего и издержек на производство по делу, а также при необходимости конфискованные вещи будут реализованы. Если денежный штраф/сумма ущерба потерпевшего будет назначена в меньшем размере, то оставшаяся сумма или вещь будут возвращены Вам.

4 Вы назначили лицо, проживающее в соответствующем судебном округе, в качестве «уполномоченного по вручению документов». Он принимает от вашего имени документы прокуратуры/суда и передает их вам. Уполномоченный по вручению документов отвечает исключительно за передачу официальных документов доверителю и не принимает никаких документов от доверителя. Доверенность явно распространяется также на получение повестки о вызове вас лично на основное судебное заседание и на другие назначенные судом даты.
«Вам было разъяснено, что в случае, если прокуратура или суд намерены прекратить производство по делу путем вынесения приказа о наказании, вы имеете право в соответствии со ст. 6 (3) п. а) ЕКПЧ получить, в дополнение к немецкому приказу о наказании, перевод на ваш основной язык».

Разъяснение согласно § 153a Уголовно-процессуального кодекса (StPO): "Вам было разъяснено, что прокуратура с Вашего согласия в соответствии с § 153a абз. 1 Уголовно процессуального кодекса (StPO) может отказаться от предъявления обвинения после уплаты денежного штрафа в размере внесенного Вами залога в качестве меры пресечения в пользу государства. Кроме того, Вам было сообщено, что совершенное Вами деяние затем не будет квалифицироваться как преступление, а производство по делу будет окончательно прекращено, при этом не возникнет дополнительных издержек и не последует внесения в Федеральный центральный реестр правонарушений. Как обвиняемой(му), кроме того, было разъяснено, что в ином случае против нее/него может быть предъявлено обвинение в уголовном процессе, Вы согласны с прекращением производства по делу и с внесенным залога в качестве меры пресечения как наказание согласно § 153a абз. 1 Уголовно процессуального кодекса (StPO).“

Просим сообщить на тот случае, если оставшаяся сумма должна будет возвращена Вам, соответственно реквизиты Вашего/другого банка.

5 Вы подтверждаете своей подписью, что получили копию "Протокола о внесение залога в качестве меры пресечения" и настоящий лист указаний/разъяснений. Служащая(ий) полиции подтверждает подписью получение внесенного Вами залога в качестве меры пресечения.` 
  },
 pl: { 
    security_deposit: ` Wskazówki/pouczenie dot. protokolu wniesienia kaucji:

1 Podanie Pana/Pani danych osobowych jako obwinionego(-ej)/poszkodowanego(-ej),

2 Podanie czynu karalnego/wykroczenia zarzucanego Panu/Pani, urzedu wlasciwego do wniesienia kaucji i nazwy jego banku i znaku kasowego.

3 Poniewaz Pan/Pani w obszarze obowiazywania przedmiotowej ustawy nie ma stalego miejsca zamieszkania lub pobytu

– moze Pan/Pani w celu unikniecia Pana/Pani zatrzymania (§ 127a niemieckiego kodeksu postepowania karnego (StPO))

– musi Pan/Pani w celu zabezpieczenia postepowania karnego/kary grzywny (§ 132 niemieckiego kodeksu postepowania karnego (StPO)), § 46 niemieckiej ustawy o wykroczeniach (OWiG)

wniesc zabezpieczenie na poczet oczekiwanej kary pienieznej/grzywny i kosztów postepowania. Zabezpieczenie moze byc wniesione, jezeli Pan/Pani nie dysponuje Euro, w innej walucie wymienialnej, papierach wartosciowych, przez ustanowienie zastawu lub przez rekojmie odpowiednich osób trzecich.

Jezeli Pan/Pani w przypadku § 132 niemieckiego kodeksu postepowania karnego (StPO) nie wniesie kaucji dobrowolnie i nie wyznaczy pelnomocnika do przyjmowania doreczen, zajete zostana srodki transportu lub inne przedmioty nalezace do Pana/Pani, które Pan/Pani wozi ze soba. W tej sprawie moze Pan/Pani w kazdej chwili we wlasciwym sadzie rejonowym wnioskowac o orzeczenie sedziowskie (§ 132 ust. 3 w polaczeniu z § 98 ust. 2 niemieckiego kodeksu postepowania karnego (StPO)). Pan/Pani ma mozliwosc wykupienia z powrotem zajetych przedmiotów przez przekazanie kaucji na konto podane pod nr. 2 i ew. przez pózniejsze wyznaczenie pelnomocnika do przyjmowania doreczen (zob. nr 4).

Kwota pieniezna wzgl. przedmioty zostana przekazane do wlasciwego urzedu. W przypadku prawomocnego ukarania kaucja zostanie rozliczona z kara pieniezna/grzywna i z kosztami postepowania, a ew. zajete przedmioty spieniezone. Jezeli kara pieniezna/grzywna nie zostanie lub zostanie ustalona w mniejszej wysokosci, pozostala kwota lub przedmiot zostanie Panu/Pani zwrócony.

4 Wyznaczyli Państwo osobę zamieszkałą w właściwym okręgu sądowym jako „pełnomocnika do odbioru pism procesowych”. Osoba ta odbiera w Państwa imieniu pisma prokuratury/sądu i przekazuje je Państwu. Pełnomocnik do odbioru pism procesowych jest odpowiedzialny wyłącznie za przekazywanie pism urzędowych upoważniającemu i nie przyjmuje żadnych pism od upoważniającego. Pełnomocnictwo obejmuje wyraźnie również odbieranie wezwań skierowanych do Państwa na rozprawę główną oraz inne terminy wyznaczone przez sąd.
„Została Pani poinformowana, że w przypadku, gdy prokuratura lub sąd zamierzają umorzyć postępowanie w drodze nakazu karnego, ma Pani prawo zgodnie z art. 6 ust. 3 lit. a EKPC do otrzymania, oprócz niemieckiego nakazu karnego, tłumaczenia na swój język ojczysty.”

Pouczenie wedlug § 153a niemieckiego kodeksu postepowania karnego (StPO): "Zostal(-a) Pan/Pani pouczony(-a), ze prokuratura za Pana/Pani zgoda wedlug § 153a ust. 1 niemieckiego kodeksu postepowania karnego (StPO) moze odstapic od wniesienia oskarzenia w zamian za zaplate grzywny w wysokosci wniesionej przez Pana/Pania kaucji na korzysc skarbu panstwa. Ponadto oznajmiono Panu/Pani, ze czyn wtedy nie jest juz karany jako przewinienie, lecz postepowanie zostaje definitywnie wstrzymane i nie powstaja dodatkowe koszty ani wpis do Centralnego Rejestru Federacji. Jako obwiniony(-a), który(-a) ponadto zostal(-a) pouczony(-a), ze w innym przypadku moze byc przeciwko niemu/ niej wniesione publiczne oskarzenie, zgadza sie Pan/Pani na umorzenie postepowania i na grzywne w wysokosci wniesionej przez Pana/Pania kaucji wedlug § 153a ust. 1 niemieckiego kodeksu postepowania karnego (StPO)."

Prosze podac na wypadek, gdyby pozostala kwota musiala byc Panu/Pani zwrócona, ew. Pana/Pani/inne dane bankowe.

5 Pan/Pani swoim podpisem potwierdza otrzymanie przebitki „Protokolu o wniesieniu kaucji“ i niniejszego arkusza wskazówek/pouczen. Funkcjonariusz policji potwierdza podpisem przyjecie wniesionej przez Pana/Pania kaucji.`
  },
  
  ro: { 
    security_deposit: ` Instructiuni privitoare la procesul verbal de depunere a cautiunii:

 1 Datele Dvs. personale în calitate de persoana acuzata/învinuita. 

2 Specificarea infractiunii / contraventiei care vi se imputa, a autoritatii competente pentru depunerea cautiunii, precum si a contului sau bancar si a nr. reg. trezorerie. 

3 Deoarece nu aveti domiciliu sau resedinta stabila pe teritoriul de valabilitate al legii respective

– puteti depune o cautiune pentru a evita arestarea Dvs. (§ 127a Strafprozessordnung [StPO] (Cod procedura penala))

– trebuie sa depuneti o cautiune pentru a asigura finalizarea actiunii penale / contraventionale (§ 132 StPO(Cod procedura penala)) si conform § 46 (OWiG) (Legea privind contraventiile)

suma care va acoperi amenda penala / contraventionala care se va pronunta, precum si cheltuielile de judecata. În cazul în care nu dispuneti de sume de bani în Euro, cautiunea se va putea depune si în alta moneda convertibila, în titluri de valoare, prin constituirea unui gaj sau printr-o scrisoare de garantie emisa de un tert acceptabil. 

În cazul prevazut de § 132 StPO (Cod procedura penala), atunci când cautiunea nu se depune în mod voluntar si nici nu se desemneaza un împuternicit pentru primirea corespondentei, vor fi confiscate mijloacele de transport sau alte obiecte detinute de Dvs. sau care va apartin. Aveti posibilitatea sa solicitati oricând judecatoriei competente luarea unei decizii judecatoresti în aceasta privinta (§ 132 par. 3 în conexiune cu § 98 par. 2 StPO (Cod procedura penala). Obiectele confiscate vi se vor putea elibera ulterior, dupa ce veti achita cautiunea în contul mentionat la punctul 2, respectiv dupa ce veti desemna un împuternicit pentru primirea corespondentei Dvs. (vezi punctul 4). 

Suma de bani, respectiv obiectele vor fi predate autoritatii competente. În cazul în care hotarârea va ramâne definitiva, din cautiunea depusa se vor retine amenda penala / contraventionala si cheltuielile de judecata, respectiv obiectele confiscate vor fi vândute la licitatie. În cazul în care nu se va emite nici o amenda sau atunci când contravaloarea amenzii penale sau contraventionale este mai mica decât cautiunea depusa, suma ramasa, respectiv obiectele confiscate vor fi restituite. 

4 Ați desemnat o persoană cu domiciliul în circumscripția judiciară competentă ca „mandatar pentru notificări”. Aceasta primește în numele dumneavoastră actele procuraturii/instanței și vi le transmite. Mandatarul pentru notificări este responsabil exclusiv de transmiterea actelor oficiale către mandant și nu preia niciun act provenind de la mandant. Procura se extinde în mod expres și asupra primirii citațiilor adresate dumneavoastră personal pentru ședința principală de judecată și pentru alte termene stabilite de instanță.
„Ați fost informat(ă) că, în cazul în care Parchetul sau instanța intenționează să încheie procedura printr-un ordin de sancționare, aveți dreptul, în conformitate cu art. 6 alin. (3) lit. a) din CEDO, să primiți, pe lângă ordinul de sancționare german, o traducere în limba dumneavoastră maternă.”

Instructiuni conform § 153a StPO (Cod procedura penala): "Vi s-a adus la cunostinta ca procuratura poate renunta la trimiterea în judecata numai cu acordul Dvs., conform § 153a par. 1 din cadrul Codului de procedura penala (StPO), cu conditia de a achita o amenda egala cu contravaloarea cautiunii depuse, suma care urmeaza sa fie virata în contul trezoreriei statului. De asemenea, vi s-a comunicat ca fapta savârsita nu va mai fi considerata atunci delict si ca dosarul va fi casat fara alte cheltuieli si nu se realizeaza o înregistrare în registrul federal central. 
În calitate de învinuit, care a fost instruit asupra faptului ca în caz contrar va putea fi trimis în judecata, declarati ca sunteti de acord cu încetarea urmaririi penale si cu virarea în contul trezoreriei statului a cautiunii depuse si considerate amenda stabilita conform § 153a par. 1 StPO (Cod procedura penala)." 

Pentru eventualitatea în care suma ramasa urmeaza sa va fie restituita, va rugam mentionati contul Dvs. bancar sau al unei persoane de încredere. 

5 Prin semnatura Dvs. confirmati primirea unei copii a prezentului „Proces verbal de depunere a unei cautiuni” si a unui exemplar din instructiunile de fata. Ofiterul de politie confirma prin semnatura sa primirea cautiunii depuse de Dvs.`
  },
  tr: { 
    security_deposit: ` Bir güvenlik hizmeti ile ilgili tutanak hakkinda uyarilar/bilgilendirme:

1 Sanik/magdur olarak kisisel bilgilerinizin belirtilmesi. 

2 Tarafiniza ithamda bulunulan suçun/kural ihlalinin, güvenlik hizmetinden sorumlu kurumun ve bunlarin banka bilgileri ile ödeme numaralari hakkindaki bilgiler. 

3 Ilgili kanunun geçerliligi kapsaminda sabit bir ikametgahinizin veya ikametinizin olmamasi nedeniyle

– tutuklanmanizin önlenmesi (Alman ceza muhakemeleri usulü [StPO] § 127a)

– Para cezasi/parasal tazmin isleminin (Alman ceza muhakemeleri usulü (StPO) § 132) güvence altina alinmasi için, § 46 kural ihlalleri hakkindaki kanun (OWiG) 

beklenmekte olan para cezasi/parasal tazmin ve islem masraflari için bir güvence saglamaniz gerekmektedir. Bu güvence, Euro cinsinden paraniz olmamasi halinde degistirilebilir diger döviz türlerinden, degerli kagitlardan, rehin islemlerinden ve uygun niteliklere sahip üçüncü bir kisinin kefaleti ile de temin edilebilir. 

Alman ceza muhakemeleri usulü (StPO) § 132 durumunda güvenlik teminini kendi isteginiz ile gerçeklestirmezseniz ve bir teslimat yetkilisini atamazsaniz, size ait olan ve beraberinizde bulunan tasit araçlari veya diger esyalara el konulacaktir. Bununla ilgili mahkeme kararini dilediginiz zaman yetkili idare mahkemesinden talep edebilirsiniz (Alman ceza muhakemeleri usulü (StPO) § 132 paragraf 3 ile baglantili olarak § 98 paragraf 2). Güvenlik tutarini No. 2 altinda belirtilen hesaba havale ederek veya sonradan bir teslimat yetkilisi atayarak (bakiniz No.4) yeniden el konulmus olan esyalarinizi tekrardan geri alma imkanina sahipsiniz. 

Parasal tutar veya bahsi geçen esyalar ilgili kuruma teslim edilir. Hukuki açidan geçerli bir ceza durumunda saglanan güvence para cezasi/-parasal tazmin ve islem masraflari ile mahsup edilir ve gerekli oldugu taktirde el konulan esyalar satilir. Herhangi bir ceza tespit edilecek veya düsük tutarda bir para cezasi/-parasal tazmin belirlenecek olursa geriye kalan meblag ve el konulan esyalar tarafiniza iade edilir. 

4 Yetkili mahkeme bölgesinde ikamet eden bir kişiyi “tebligat vekili” olarak atadınız. Bu kişi, savcılık/mahkeme belgelerini sizin adınıza alır ve size iletir. Tebligat vekili, yalnızca resmi belgelerin vekalet veren kişiye iletilmesinden sorumludur ve vekalet veren kişinin belgelerini kabul etmez. Vekaletname, açıkça sizin adınıza mahkeme duruşmalarına ve mahkeme tarafından belirlenen diğer tarihlere ilişkin celplerin alınmasını da kapsamaktadır.
“Savcılık veya mahkeme, davayı ceza emri yoluyla sonlandırmayı planlaması durumunda, AİHS’nin 6. maddesinin (3) numaralı fıkrasının a bendi uyarınca, Almanca ceza emrine ek olarak ana dilinde bir çeviri alma hakkına sahip olduğunuz konusunda bilgilendirildiniz.”

Alman ceza muhakemeleri usulü (StPO) § 153a uyarinca bilgilendirme: "Savciligin Alman ceza muhakemeleri usulü (StPO) § 153a paragraf 1 ceza muhakemeleri usulüne uygun olarak sizin onayinizla tarafinizca devlet hazinesine saglanmis olan güvence tutarinin ödenmesi karsiliginda dava açmaktan vazgeçebilecegi hakkinda bilgilendirildiniz. Ayrica suçun bu asamadan sonra artik islenmis bir suç olarak cezalandirilmayacagi, aksine, islemin herhangi türden ek masraflar olusmadan ve federal sicil kaydina herhangi bir kayit yapilmadan tamamen durdurulacagi tarafiniza anlatildi. Bunun disinda sanik olarak aksi taktirde aleyhinizde kamu davasi açilabilecegi hakkinda bilgilendirildiginizden, islemin durdurulmasi ve tarafinizca parasal tazmin olarak saglanmis olan güvencenin Alman ceza muhakemeleri usulü (StPO) § 153a paragraf 1) uyarinca alinacagini kabul ediyorsunuz". 

Lütfen geriye kalan bir tutar olmasi halinde tarafiniza iadesinin yapilabilmesi için kendinize ait veya bir baskasina ait banka bilgilerini belirtin. 

5 Imzaniz ile "Güvence saglanmasi hakkinda tutanak" dokümaninin ve bu öneri ve bilgilendirme dokümaninin bir suretini teslim aldiginizi onaylamis olursunuz. Polis memuru imzasi ile tarafinizca saglanmis olan güvenceyi teslim aldigini teyit etmektedir.`
  },
  sl: { 
    security_deposit: ` Navodila/pouk k zapisniku o placilu varšcine:

1 Navedba vaših osebnih podatkov kot obdolženca/ke/zadevne osebe. 

2 Navedba kaznivega dejanja/prekrška, ki vam je ocitan/o, pristojnega organa za placilo varšcine ter njegove bancne zveze in blagajniške oznake. 

3 Ker v okviru podrocja uporabe zadevnega zakona nimate stalnega prebivališca ali bivališca

– lahko v izogib prijetju (clen 127a Zakona o kazenskem postopku [StPO])

– morate za zagotovitev kazenskega postopka/postopka izreka globe (clen 132 Zakona o kazenskem postopku [StPO]), clen 46 Zakona o prekrških (OWiG) 

placati varšcino za pricakovano denarno kazen/globo in za stroške postopka. Ce nimate na voljo evrov, lahko varšcino položite v drugi konvertibilni valuti, vrednostnih papirjih, z zastavitvijo ali s poroštvom ustrezne tretje osebe. 

Ce v skladu s clenom 132 Zakona o kazenskem postopku (StPO) ne položite varšcine prostovoljno in ne imenujete pooblašcenke(ca/ke) za vrocitve, se vam zasežejo prevozna sredstva in drugi predmeti, ki jih imate pri sebi in ki vam pripadajo. V zvezi s tem lahko kadarkoli zaprosite za sodniški sklep pri pristojnem okrožnem sodišcu (3. odst., 132. cl. v zvezi z 2. odst. 98. cl. Zakona o kazenskem postopku (StPO). Imate možnost, da z nakazilom varšcine na racun, naveden pod tocko 2, in morebiti z naknadnim imenovanjem pooblašcenca/ke za vrocitve (glejte tocko 4) ponovno odkupite zasežene predmete. 

Znesek oziroma predmeti se izrocijo pristojnemu organu. V primeru pravnomocnega pregona se varšcina obracuna z denarno kaznijo/globo in stroški postopka, zaseženi predmeti pa se unovcijo, ce je treba. Ce se denarna kazen/globa ne doloci ali se doloci nižja denarna kazen/globa, se vam preostali znesek ali stvar vrne. 

4 Imenovali ste osebo, ki prebiva v pristojnem sodnem okrožju, za »pooblaščenca za vročanje«. Ta v vašem imenu prejema pisna obvestila tožilstva/sodišča in vam jih vroča. Pooblaščenec za vročanje je pristojen izključno za pošiljanje uradnih pisnih obvestil pooblastitelju in ne sprejema nobenih pisnih obvestil pooblastitelja. Pooblastilo se izrecno nanaša tudi na prejem vabil za glavno obravnavo in druge sodne roke, ki so vam bili določeni.
»Bili ste poučeni, da imate v primeru, če tožilstvo ali sodišče namerava postopek zaključiti s kazenskim nalogom, pravico v skladu s členom 6(3)(a) EKČP, da poleg nemškega kazenskega naloga prejmete tudi prevod v svoj glavni jezik.« 

Pouk v skladu s clenom 153a Zakona o kazenskem postopku (StPO): "Pouceni ste bili, da lahko državno tožilstvo z vašim soglasjem v skladu s 1. odst. 153a cl. Zakona o kazenskem postopku (StPO) v primeru placila globe v višini varšcine, ki ste jo zbrali, v korist državne blagajne opusti tožbo. Razkrito vam je bilo tudi, da se dejanje v tem primeru ne kaznuje vec kot prestopek, temvec se postopek ustavi, ne da bi pri tem nastali dodatni stroški in brez vpisa v osrednji zvezni kazenski register. 
Kot obdolženec/ka, ki je bil/a poleg tega tudi poucen/a, da je lahko v nasprotnem primeru proti njemu/njej vložena uradna tožba, se strinjate z ustavitvijo postopka in varšcino, ki ste jo placali kot globo, v skladu s 1. odst. 153a cl. Zakona o kazenskem postopku (StPO)." 

Navedite svojo/drugo bancno zvezo, ce vam bo treba vrniti preostali znesek. 

5 S svojim podpisom potrjujete, da ste prejeli kopijo "zapisnika o varšcini" in ta list z navodili/poukom. Policist/ka s svojim podpisom potrjuje, da je od vas prejel/a položeno varšcino`
  },
  hu: { 
    security_deposit: ` Útmutatás/kioktatás a biztosítéknyújtási jegyzokönyvhöz

 1 Az Ön - mint gyanúsított/érintett - személyi adatai. 

2 Az Önnek felrótt buncselekmény/szabálysértés, a biztosítéknyújtásban illetékes hatóság, valamint e hatóság bankkapcsolatának és pénztári jelének megadása. 

3 Mivel Önnek nincs állandó lakása vagy tartózkodási helye a szóban forgó törvény hatályossági területén,

– orizetbe vételének elhárítása céljából (Bünteto Eljárásjog [StPO] 127a. §) Ön biztosítékot adhat, ill.

– a büntetoeljárás/szabálysértési eljárás biztosítása végett (StPO 132. §) és a Szabálysértésekrol szóló törvény (OWiG) 46. § értemében Önnek biztosítékot kell adnia

a várható pénzbüntetésre/pénzbírságra, valamint az eljárás költségeire. Ha nem rendelkezik euróval, más konvertibilis valutában, értékpapírokban, elzálogosítás vagy megbízható harmadik fél kezessége révén is teljesítheti a biztosítéknyújtást. 

Ha Ön a Bünteto Eljárásjog (StPO) 132. § értelmében önként nem teljesíti a biztosítéknyújtást, és nem nevez meg egy kézbesítési meghatalmazottat, zár alá veszik azokat a szállítóeszközöket vagy más tárgyakat, amelyeket magával hoz és amelyek az Ön tulajdonát képezik. Erre vonatkozólag bármikor kérelmezheti a bírói határozatot az illetékes Városi Bíróságon. (StPO 132. § 3. bekezdés és ehhez kapcsolódóan a 98. § 2. bekezdés). Önnek lehetosége van arra, hogy a zár alá vett tárgyakat a biztosíték 2. pontban megadott számlára történo átutalásával és adott esetben egy kézbesítési meghatalmazottat megnevezve (lásd a 4. pontot!) kiváltsa. 

A pénzösszeget ill. a tárgyakat leadják az illetékes hatóságnak. Jogeros büntetés esetén a biztosítékadást el lehet számolni a pénzbüntetéssel/pénzbírsággal és az eljárás költségeivel, valamint adott esetben értékesíteni lehet a lefoglalt holmikat. Ha nem szabnak ki, vagy csekélyebb mértéku pénzbüntetést/pénzbírságot szabnak ki, akkor a fennmaradó összeget vagy a holmit visszaadják Önnek. 

4 Kijelöltek egy, az illetékes bírósági körzetben lakó személyt „kézbesítési meghatalmazottnak”. Ő veszi át az Ön nevében az ügyészségtől/bíróságtól érkező iratokat, és továbbítja azokat Önnek. A kézbesítési meghatalmazott kizárólag a hivatalos iratoknak a meghatalmazó részére történő továbbításáért felelős, és nem veszi át a meghatalmazótól érkező iratokat. A meghatalmazás kifejezetten kiterjed az Ön nevére szóló idézések átvételére is a bírósági tárgyalásra és egyéb bírósági tárgyalási időpontokra vonatkozóan.
„Tájékoztatták arról, hogy amennyiben az ügyészség vagy a bíróság az eljárást büntetővégzéssel kívánja megszüntetni, az EJEE 6. cikk (3) bekezdés a) pontja értelmében joga van ahhoz, hogy a német nyelvű büntetővégzés mellett fordítást is kapjon anyanyelvén.”

Kioktatás a Bünteto Eljárásjog (StPO) 153a. § szerint: „Kioktatásban részesültem arról, hogy a bünteto eljárásjog 153a. § 1. bekezdése értelmében az ügyészség hozzájárulásommal eltekinthet a vádemeléstol, mégpedig az általam szolgáltatott biztosíték nagyságával egyenlo összeg államkassza javára történo befizetése ellenében. Ezen kívül közölték velem, hogy a cselekményt ezután már nem büntetik buncselekményként, hanem véglegesen beszüntetik az eljárást, anélkül, hogy további járulékos költségek merülnének fel és bejegyeznék a szövetségi központi bunügyi nyilvántartásba. 
Gyanúsítotti minoségemben, akit ezen kívül arról is kioktattak, hogy ellenkezo esetben közvádat emelhetnek ellenem, egyetértek azzal, hogy az eljárást beszüntetik és az StPO 153a. § 1. bekezdés szerint pénzbírságként befizetem az általam szolgáltatott biztosítékot." 

Ha szükséges, adja meg az Ön bankkapcsolatát vagy egy más bankkapcsolatot arra az esetre, ha a fennmaradó összeget vissza kell adni Önnek. 

5 Ön aláírásával igazolja, hogy megkapta a "Biztosítéknyújtási jegyzokönyv" és ezen útmutató/kioktatás másolatát. A rendortisztviselo aláírással igazolja az Ön által nyújtott biztosíték átvételét.`
  },
  
  uk: { 
    security_deposit: ` Bказівки / Роз’яснення до протоколу про внесення застави:

1 Зазначення особистих даних обвинуваченого / особи, якої це стосується. 

2 Зазначення злочинного діяння / адміністративного правопорушення, у вчиненні якого Ви обвинувачуєтеся, та компетентного органу для застави, а також його банківські реквізити та касовий номер. 

3 Так як у Вас немає постійного місця проживання чи перебування на території дійсності відповідного закону,

– то Ви можете з метою уникнення ув’язнення (§ 127a Кримінально-процесуального кодексу (StPO)

– то Ви повинні для забезпечення провадження кримінальної / адміністративної справи (§ 132 КПК (StPO)), § 46 Кодексу про адміністративні порушення (OWiG))

надати заставу для оплати очікуваного грошового штрафу / стягнення та пов’язаних із процесом коштів. Якщо у Вас немає євро, то заставу можна внести в іншій конвертованій валюті, у вигляді цінних паперів, запоруки або поручительства відповідних третіх осіб.

Якщо у випадку § 132 КПК (StPO) Ви не внесете заставу добровільно та не призначите уповноваженого до отримання документів, то у Вас вилучаються транспортні засоби або інші належні Вам предмети, які Ви маєте при собі. У зв’язку із цим Ви можете у будь-який час запросити прийняття рішення компетентним дільничним судом у цьому питанні (§ 132, абз. 3 у сукупності із § 98, абз. 2 КПК (StPO)). У Вас є можливість отримати назад вилучені предмети, перерахувавши заставу на зазначений у п. 2 рахунок та за певних обставин призначивши додатково уповноваженого до отримання документів (див. п. 4).

Грошова сума чи предмети передаються компетентному органу. У випадку чинного притягнення до відповідальності застава використовується для покриття грошового штрафу / стягнення та пов’язаних із процесом коштів, а за певних обставин вилучені речі реалізуються з метою використання їх вартості. В разі призначення меншого грошового штрафу / стягнення або непризначення взагалі, решта суми або річ повертається Вам назад.

4 Ви призначили особу, яка проживає у відповідній судовій окрузі, «уповноваженим на отримання документів». Вона отримує за вас документи від прокуратури/суду та передає їх вам. Уповноважений на отримання документів відповідає виключно за надсилання офіційних документів довірителю та не приймає жодних документів від довірителя. Довіреність також прямо поширюється на отримання повісток про вашу явку на основне судове засідання та інші призначені судом терміни.
«Вас поінформували про те, що у разі, якщо прокуратура або суд мають намір припинити провадження шляхом винесення постанови про покарання, ви маєте право відповідно до ст. 6 (3) літ. а ЄКПЛ, окрім німецької постанови про покарання, отримати переклад на вашу основну мову».

Роз’яснення згідно § 153a КПК (StPO): 
«Вам було вказано на те, що прокуратура за Вашою згодою згідно § 153a, абз. 1 Кримінально-процесуального кодексу (StPO) може відмовитися від висування обвинувачення, якщо на користь державної каси буде сплачене стягнення у розмірі внесеної Вами застави. Крім того, Вам було оголошено, що в такому випадку діяння не переслідуватиметься далі як порушення закону, а провадження у справі буде остаточно припинене без виникнення додаткових коштів та без внесення запису до Федерального центрального реєстру правопорушень.
Вам як обвинуваченому було вказано на те, що в протилежному випадку проти Вас буде висунуто публічне обвинувачення, і Ви заявили свою згоду на припинення провадження у справі та використання внесеної Вами застави для покриття стягнення згідно § 153a, абз. 1 КПК (StPO).»

Зазначте (свої) банківські реквізити, якщо Ви бажаєте отримати назад можливий залишок суми.

5 Своїм підписом Ви підтверджуєте отримання копії «Протоколу про внесення застави» та цієї Пам’ятки із вказівками / роз’ясненнями. Службовець поліції підтверджує своїм підписом отримання внесеної Вами застави.`
  }, 
  hi: { 
    security_deposit: ` जमानत भुगतान अभभलेख प्रकरि्ा के संबंि में जानकारी/ भनददेश:

1 आपको अपराि के भलए दोरारोभपत पक्ष/ प्रभाभवत पक्ष के रूप में भववरण देना होगा|

2 आपको, आप पर लगे आपराभिक/ गैर-आपराभिक अपराि के आरोप, जमानत भुगतान के उत्तरदा्ी अभिकारी, और उनके बैंक खाते और लेनदेन संख्ा के भववरण देने होंगे|

3 संबंभित कानून के प्रसार के अंतग्षत आपके पास कोई भनभचित आवास ्ा भनवास नहीं है, इसभलए:

- आप कारावास ्ालने के भलए जमानत का भुगतान कर सकते/ सकती हैं (आपराभिक का््षवाही की जम्षन संभहता (StPO) की िारा 127a)

- आपको आपराभिक/ संभक्षप्त का््षवाभह्ों के भलए जाभमन प्रदान करने हेतु जमानत का भुगतान करना होगा (आपराभिक का््षवाही की जम्षन संभहता (StPO) की िारा 132, जम्षन प्रशासकी् अपराि अभिभन्म (OWiG) की िारा 46)

प्रत्ाभशत जुमा्षना/ दंड के संबंि में और का््षवाभह्ों की लागत के संबंि में| ्कद आप ्ूरो में भुगतान नहीं कर सकते/ सकती हैं, तो आप पररवत्षनी् मुद्ा, जाभमन, ्ा ककसी उभचत तृती् पक्ष द्ारा प्रदान की गई प्रभतभूभत ्ा गारं्ी के द्ारा भुगतान कर सकते/ सकती हैं|

्कद आप आपराभिक का््षवाही की जम्षन संभहता (StPO) की िारा 132 के अंतग्षत जमानत का भुगतान सवेचछा से nicht करते/ करती हैं और ्कद आप कोई अभिकृत प्रापक का नाम नहीं देते/ देती हैं, तो आपके पररवहन का सािन ्ा आपके पास की अन् वसतुएं जबत कर ली जाएंगी| आप कभी भी ्ह भनवेदन कर सकते/सकती हैं कक भजला न्ा्ाल् इस संबंि में वैिाभनक भनण्ष् प्रदान करें (आपराभिक का््षवाही की जम्षन संभहता (StPO) की िारा 98 के अनुचछेद 2 के साथ िारा 132 के अनुचछेद 3)| आप खंड 2 में उललेभखत खाते में जमानत का भुगतान करके और, लागू होने पर अभिकृत प्रापक का नाम प्रदान करके जबत की गई वसतुओं को छुड़ा सकते/ सकती हैं (खंड 4 देखें)|

िन और/्ा वसतुओं को उभचत अभिकारी के सुपुद्ष कर कद्ा जाएगा| क़ानूनी रूप से बाध् जुमा्षने की भसथभत में, जमानत को दंड/ जुमा्षने के अनुसार और का््षवाभह्ों की लागतों के अनुसार, और, लागू होने पर, जबत की गई वसतुओं के अनुसार भनिा्षररत कक्ा जाएगा| कोई दंड/ जुमा्षना ना लगाए जाने पर, ्ा कम दंड लगाए जाने पर, शेर राशी ्ा सामरिी आपको लौ्ा दी जाएगी|

4 आपने संबंधित न्यायिक जिले में निवास करने वाले एक व्यक्ति को 'प्रक्रिया की सेवा के लिए अधिकृत प्रतिनिधि' के रूप में नियुक्त किया है। यह व्यक्ति आपके लिए लोक अभियोजक कार्यालय या न्यायालय से दस्तावेज़ प्राप्त करेगा और उन्हें आपको अग्रेषित करेगा। अधिकृत प्रतिनिधि केवल मुख्य व्यक्ति को आधिकारिक दस्तावेज़ अग्रेषित करने के लिए जिम्मेदार है और मुख्य व्यक्ति से कोई भी दस्तावेज़ स्वीकार नहीं करेगा। प्राधिकृत प्रतिनिधि मुख्य न्यायालय में मुख्य सुनवाई और न्यायालय द्वारा निर्धारित अन्य तिथियों के लिए व्यक्तिगत रूप से आपको संबोधित समन प्राप्त करने के लिए भी उत्तरदायी है।
"आपको सूचित किया गया है कि, यदि सार्वजनिक अभियोजक कार्यालय या न्यायालय दंड आदेश के माध्यम से कार्यवाही को समाप्त करने का इरादा रखता है, तो आपके पास ECHR के अनुच्छेद 6(3)(a) के तहत जर्मन दंड आदेश के अलावा अपनी मुख्य भाषा में अनुवाद प्राप्त करने का अधिकार है।"

आपराभिक का््षवाही की जम्षन संभहता (StPO) की िारा 153a के अंतग्षत भनददेश: “आपको ्ह बता्ा ग्ा है कक आपकी सहमती होने पर और दंड के रूप में जमानत की प्र्ोज् राशी का भुगतान साव्षजभनक भनभि में करने पर सरकारी वकील का भवभाग आपराभिक का््षवाही की जम्षन संभहता (StPO) की िारा 153a के अनुचछेद 1 के अंतग्षत आपको अभभ्ोग से बचा सकता है| आपको ्ह भी बता्ा ग्ा है कक ततपचिात का््षवाही को दंडनी् अपराि नहीं माना जाएगा, लेककन ककसी अभतररक्त लागत के भबना और अपराि भसभधि के संघी् केनद्ी् रभजस्र में प्रभवभटि के भबना का््षवाभह्ों पर एक अंभतम रोक लगा दी जाएगी|

आपको इस बात से अवगत कराए जाने पर कक अभभ्ुक्त के रूप में आप पर साव्षजभनक अभभ्ोग लगाए जा सकते हैं, आप आपराभिक का््षवाही की जम्षन संभहता (StPO) की िारा 153a के अनुचछेद 1 के अंतग्षत का््षवाभह्ों को रोकने और दंड के रूप में जमानत का भुगतान करने की सहमती प्रदान करते/करती हैं|”

कृप्ा अपने बैंक खाते ्ा ककसी अन् बैंक खाते का भववरण दें, ताकक कोई भी शेर राशी आपको लौ्ाई जा सके |

5 इस दसतावेज पर हसताक्षर करके आप “जमानत भुगतान अभभलेख” और इस जानकारी/ भनददेश पत्रक की प्रत प्राप्त होने की पुभटि करते/करती हैं| पुभलस अभिकारी आपके द्ारा जमानत का भुगतान प्राप्त होने की पुभटि सवरूप हसताक्षर करता है|`
  },  
bg: { 
    security_deposit: ` Правно указание относно протокола за даване на обезпечителна гаранция:

1 Посочване на личните Ви данни като уличено/потърпевшо лице.

2 Данни за престъпението/адм. нарушение, в което сте обвинен, компетентната служба за обезпечителната гаранция, както и нейните банкови реквизити и касов знак.

3 Тъй като нямате постоянно местожителство или пребиваване в полето на приложение на съответния закон,

3 Тъй като нямате постоянно местожителство или пребиваване в полето на приложение на съответния закон,– за да предотвратите Вашето задържане (§ 127а Наказателно-процесуален кодекс [НПК] (StPO))

– за обезпечаване на наказателното/административното производство (§ 132 НПК (StPO), § 46 от Закона за административните нарушения (ЗААН) (OWiG)

във връзка с очакващата Ви парична глоба/финансова санкция, както и относно разноските по делото, Вие трябва да заплатите гаранция. Гаранцията може да бъде заплатена в друга конвертируема валута, ако не разполагате с евро, с ценни книжа, чрез учредяване на залог или посредством поръчителство на трети лица.

Ако в случаите на § 132 НПК (StPO) не заплатите доброволно обезпечителната гаранция и не посочите упълномощено лице респ. надлежен съдебен служител, донесените от Вас средства или други предмети ще бъдат конфискувани. Вие можете да заявите по всяко време получаването на съдебното решение от компетентния Районен съд (§ 132 ал. 3 във вр. с § 98 ал. 2 НПК (StPO)). Вие имате възможност да върнете конфискуваните предмети като преведете обезпечителната гаранция на посочената в точка № 2 банкова сметка и евентуално като посочите допълнително надлежен съдебен служител.

Сумата респ. предметите ще бъдат върнати на компетентната служба. В случай на постановено наказание обезпечителната гаранция ще се пресметне с паричната глоба/финансовата санкция и разноските по делото и евентуално конфискуваните вещи ще бъдат оползотворени. Ако не се определи парична глоба или нейният размер е незначителен, то останалата част от сумата или вещите ще Ви бъдат върнати.

4 Вие сте посочили лице, което пребивава в съответния съдебен окръг, като „упълномощен представител за получаване на документи“. То получава от ваше име писмените документи от прокуратурата/съда и ви ги предава. Упълномощеният представител за получаване на документи отговаря изключително за изпращането на официални документи до упълномощителя и не приема документи от упълномощителя. Пълномощното изрично обхваща и получаването на призовки, адресирани лично до Вас, за съдебно заседание по същество и други насрочени от съда срокове.
„Вие сте били информирани, че в случай че прокуратурата или съдът възнамеряват да прекратят производството чрез наказателна заповед, имате право съгласно чл. 6, ал. 3, буква а) от ЕКПЧ да получите, в допълнение към германската наказателна заповед, превод на основния Ви език.“

Правно указание съгласно № 153а НПК (StPO): „Беше Ви обяснено, че с Ваше съгласие съгласно § 153a ал. 1 от Накзателно-процесуалния кодекс (НПК) (StPO) прокуратурата може да се откаже от предявяване на обвинителен акт срещу заплащане на глоба в размер на внесената от Вас в полза на държания бюджет обезпечителна гаранция. Освен това Ви беше обяснено, че в такъв случай провинението повече не може да бъде наказвано и че делото окончателно може да бъде прекратено при положение, че не възникнат допълнителни разноски и се направи отметка във Централния федерален регистър.
Освен това като уличено лице, което бе информирано, че в противен случай срещу него може да бъде повдигната публична жалба, сте съгласни с преустановяване на производството и заплатената от Вас обезпечителна гаранция като глоба съгласно § 153а ал. 1 НПК (StPO)."

В случай, че трябва да Ви бъде върната останалата сума, Ви умоляваме да посочите евентуално Вашата/ друга банкова сметка.

5 С подписа си потвърждавате, че сте получили копие от „Протокола за даване на гаранция" и това правно указание. Полицейският/ата служител/ка потвърждава с подписа си, че е получил/а платената от Вас гаранция.`
  },
 cs: { 
    security_deposit: ` Pokyny/poucení k Zápisu o složení jistoty:

1 Uvedení vašich osobních údaju jako obvinené osoby/dotcené osoby.

2 Udání trestného cinu/prestupku, ze kterého jste obvinováni, údaje o úradu príslušném k vaší penežité záruce, o jeho bankovním spojení a o znacce pokladny.

3 Vzhledem k tomu, že podle príslušného platného zákona nemáte žádné trvalé bydlište nebo místo pobytu

– mužete k odvrácení vašeho zadržení (§ 127a trestního rádu [StPO])

– musíte k zajištení trestního rízení/rízení o udelení penežitého trestu (§ 132 trestního rádu (StPO)), § 46 zákona o prestupcích (OWiG)

složit penežitou záruku na ocekávanou pokutu/penežitý trest a na náklady rízení. Penežitou záruku mužete složit, pokud nedisponujete menou euro, v jiné volne smenitelné mene, v cenných papírech, urcením zástavy nebo zárukou vhodných tretích osob.

Pokud v prípade § 132 trestního rádu (StPO) nesložíte penežitou záruku dobrovolne a neurcíte osobu zplnomocnenou k prijímání písemností, budou vám zabaveny dopravní prostredky nebo jiné predmety, které máte s sebou a které vám patrí. V této veci mužete kdykoliv žádat príslušný obvodní soud o soudní rozhodnutí (§ 132 odst. 3 ve spojení s § 98 odst. 2 trestního rádu (StPO)). Zabavené veci mužete opet uvolnit prevodem penežité jistoty na úcet uvedený pod bodem 2 a príp. dodatecným jmenováním osoby zplnomocnené k prebírání písemností (viz bod 4).

Penežitá cástka nebo predmety jsou odevzdány príslušnému úradu. V prípade pravomocného trestu bude penežitá jistota zaúctována k penežité pokute/penežitému trestu a k nákladum rízení, prípadne zabavené predmety budou zpeneženy. Pokud nebude stanovena žádná pokuta/penežitý trest nebo budou stanoveny v nižší výši, bude vám zbývající cástka nebo vec vrácena.

4 Jmenovali jste osobu s bydlištěm v příslušném soudním obvodu jako „zástupce pro doručování“. Tato osoba za vás přebírá písemnosti od státního zastupitelství/soudu a doručuje vám je. Zástupce pro doručování je oprávněn výhradně k předávání úředních písemností zmocniteli a nepřijímá žádné písemnosti od zmocnitele. Plná moc se výslovně vztahuje také na přijímání předvolání adresovaných vaší osobě k hlavnímu soudnímu jednání a k dalším soudním termínům.
„Byla poučena o tom, že pokud má státní zastupitelství nebo soud v úmyslu řízení ukončit trestním příkazem, má podle čl. 6 odst. 3 písm. a) EÚLP právo obdržet kromě německého trestního příkazu také překlad do svého hlavního jazyka.“

Poucení podle § 153a trestního rádu (StPO): „Byl(-a) jste poucen(-a) o tom, že státní zastupitelství s vaším souhlasem podle § 153a odst. 1 trestního rádu (StPO) muže upustit od vznesení obžaloby oproti platbe penežité pokuty ve výši vámi zaplacené penežité záruky ve prospech státní pokladny. Krome toho vám bylo sdeleno, že cin pak již není potrestán jako precin, ale rízení je zastaveno, aniž by vznikly další náklady a není proveden zápis do Centrálního spolkového rejstríku.
Jako obvinený(-á) který(-á) byl(-a) poucen(-a) navíc o tom, že v opacném prípade muže být proti vám vznesena verejná žaloba, souhlasíte se zastavením rízení a s uložením penežité záruky jako penežitého trestu podle § 153a odst. 1 trestního rádu (StPO).“

Pro prípad, že by vám musela být zaslána zpet zbývající cástka, uvedte vaše/jiné bankovní spojení.

5 Svým podpisem potvrzujete, že jste obdržel(-a) kopii „Zápisu o složení jistoty“ a tento dokument s pokyny a poucením. Policejní úredník potvrzuje podpisem príjem vámi složené penežité záruky.`
  },
  
  lt: { 
    security_deposit: ` Nurodymai ir tvarkos išaiškinimas surašant protokola del užstato mokejimo: 

1 Jusu kaip itariamojo/pažeidejo asmens duomenys. 

2 Nurodyta nusikalstama veika /nusižengimas, del kurio esate itariamas, už užstata atsakinga istaiga bei jos banko rekvizitai ir kasos numeris. 

3 Kadangi atitinkamo istatymo galiojimo srityje Jus neturite nuolatines gyvenamosios vietos arba negyvenate

– galite noredamas išvengti sulaikymo (Vokietijos Baudžiamojo proceso kodekso [StPO] 127a str.)

– privalote baudžiamosios bylos/bylos del pinigines baudos skyrimo proceso užtikrinimui (Vokietijos BPK [StPO] 132 str., Administraciniu nusižengimu istatymo [OWiG] 46 str.) 

sumoketi Jums gresiancios pinigines baudos užstata už bylos nagrinejimo išlaidas. Jei Jus neturite euru, užstatu gali buti kita konvertuojama valiuta, vertybiniai popieriai, turto ikeitimas arba už Jus gali laiduoti teise tam turintys tretieji asmenys. 

Jei Jus savanoriškai neinešite užstato ir nepaskirsite igaliotinio su byla susijusiems dokumentams pristatyti, kaip nurodyta Vokietijos BPK 132 str., tai transporto priemones ar kiti daiktai, kuriuos su savimi turite ar kurie Jums priklauso, bus paimti. Del to Jus galite bet kada kreiptis i atsakinga apylinkes teisma ir pareikalauti teisejo sprendimo (Vokietijos BPK 132 str. 3 d. susiejant su BPK 98 str. 2 d.). Jums suteikiama galimybe išpirkti paimtus daiktus pervedant užstata i 2 punkte nurodyta saskaita ir tam tikromis aplinkybemis veliau paskiriant igaliotini dokumentams pristatyti (žr. 4 punkta). 

Pinigai arba daiktai perduodami atsakingai institucijai. Jei bausme isiteiseja, užstatas pasiliekamas padengti pinigine bauda ir bylos išlaidas, tam tikrais atvejais realizuojami paimti daiktai. Jei nepaskiriama pinigine bauda arba paskiriama mažesnio dydžio bauda, tai likusi suma arba daiktai Jums gražinami. 

4 Jūs paskyrėte asmenį, gyvenantį atitinkamoje teismo apygardoje, „įgaliotuoju asmeniu dokumentams priimti“. Jis jūsų vardu priima prokuratūros ar teismo dokumentus ir juos jums perduoda. Įgaliotasis asmuo dokumentams priimti yra atsakingas tik už oficialių dokumentų perdavimą įgaliotojui ir nepriima jokių įgaliotojo dokumentų. Įgaliojimas aiškiai apima ir jūsų asmeninių šaukimų į pagrindinį teismo posėdį bei kitus teismo nustatytus terminus priėmimą.
„Jums buvo paaiškinta, kad jei prokuratūra ar teismas ketina nutraukti bylą baudžiamuoju įsakymu, pagal EŽTK 6 straipsnio 3 dalies a punktą turite teisę gauti ne tik Vokietijos baudžiamąjį įsakymą, bet ir jo vertimą į savo pagrindinę kalbą.“

Teisiu išaiškinimas pagal Vokietijos BPK 153a str.: 
„Jums išaiškinta, kad prokuratura Jums sutikus pagal Vokietijos Baudžiamojo proceso kodekso (StPO) 153a str. 1 d. gali atsisakyti pateikti kaltinima, jei sumokesite valstybes iždui bauda, kuri lygi Jusu užstato dydžiui. Be to, Jums buvo išaiškinta, kad po to veika nepersekiojama kaip baudžiamasis nusižengimas, bet byla galutinai nutraukiama, taciau papildomu išlaidu cia neatsiranda, ir ši veika neitraukiama i Federalini nusikalstamu veiku registra. 
Jums taip pat išaiškinta, kad budamas itariamasis sutinkate su bylos nutraukimu ir Jusu pateikto užstato naudojimu baudai sumoketi pagal Vokietijos BPK 153a str. 1 d; priešingu atveju Jums gali buti pateiktas kaltinimas. " 

Prašom nurodyti savo banko rekvizitus, jei neišnaudota pinigu dali reiketu Jums gražinti, nurodykite savo ar kito asmens saskaita. 

5 Savo parašu patvirtinate, kad gavote „Protokolo del užstato mokejimo“ nuoraša ir ši Nurodymu/išaiškinimu lapa. Policijos pareigunas savo parašu patvirtina, kad gavo Jusu sumoketa užstata.`
  },
  nl: { 
    security_deposit: ` Instructies/voorlichting omtrent het proces van een zekerheidsstelling:
 
1 Opgave van uw persoonlijke gegevens als verdachte/betrokkene. 

2 Vermelding van het strafbaar feit/de overtreding waarvan u wordt beschuldigd, de inzake de zekerheidsstelling bevoegde instantie alsmede haar bankgegevens en kascode. 

3 Aangezien u binnen het geldigheidsgebied van de wet niet beschikt over een vaste woon- of verblijfplaats

– kunt u ter afwending van uw inhechtenisneming (§ 127a Strafprozessordnung [StPO/Wetboek van strafvordering]

– moet u ter veiligstelling van de straf-/boeteprocedure (§ 132 StPO/Wetboek van strafvordering), § 46 Gesetz über Ordnungswidrigkeiten (OWiG/Wet inzake administratieve overtredingen)
 
voor de te verwachten geldstraf/geldboete alsmede voor de kosten van de procedure een zekerheid stellen. De zekerheid kan, indien u niet over euro beschikt, in een andere converteerbare valuta, in waardepapieren, door pandgeving of via een borgstelling van een passende derde worden gesteld. 

Wanneer u in geval van § 132 StPO/Wetboek van strafvordering de zekerheid niet vrijwillig stelt en geen domiciliehouder aanwijst, worden de transportmiddelen of andere voorwerpen die u bij u heeft en die aan u toebehoren, in beslag genomen. U kunt hiervoor te allen tijde bij het bevoegde Amtsgericht (kantongerecht) een rechterlijke beslissing aanvragen (§ 132, derde lid, juncto § 98, tweede lid, StPO/Wetboek van strafvordering). U heeft de mogelijkheid om de in beslag genomen voorwerpen door middel van overmaking van de zekerheidsstelling op het onder nr. 2 vermelde rekeningnummer en eventueel een aanwijzing achteraf van een domiciliehouder (zie nr. 4) weer vrij te kopen. 

Het geldbedrag of de voorwerpen worden afgegeven aan de bevoegde instantie. In het geval van een rechtsgeldige veroordeling wordt de zekerheidsstelling met de geldstraf/geldboete en de kosten van de procedure verrekend en worden de eventueel in beslag genomen voorwerpen te gelde gemaakt. Indien geen straf of een lagere geldstraf/ geldboete wordt vastgelegd, wordt het resterende bedrag of het in beslag genomen voorwerp aan u teruggegeven. 

4 U hebt een persoon die in het bevoegde gerechtelijke arrondissement woont, aangewezen als „volmachtdrager voor betekening“. Deze ontvangt namens u de stukken van het Openbaar Ministerie/de rechtbank en bezorgt deze aan u. De volmachtdrager voor betekening is uitsluitend bevoegd voor het doorsturen van officiële stukken naar de volmachtgever en neemt geen stukken van de volmachtgever in ontvangst. De volmacht strekt zich uitdrukkelijk ook uit tot het in ontvangst nemen van dagvaardingen aan uw persoon voor de hoofdbehandeling en andere door de rechtbank vastgestelde termijnen.
„U bent erop gewezen dat, indien het Openbaar Ministerie of de rechtbank voornemens is de procedure door middel van een strafbevel te beëindigen, u op grond van artikel 6, lid 3, onder a), van het EVRM het recht hebt om, naast het Duitse strafbevel, een vertaling in uw moedertaal te ontvangen.”

Voorlichting overeenkomstig § 153a StPO/Wetboek van strafvordering: 
"U werd erop gewezen dat het Openbaar Ministerie met uw toestemming op grond van § 153a, eerste lid, van het Duitse wetboek van strafvordering (Strafprozessordnung - StPO) kan afzien van een inbeschuldigingstelling tegen betaling van een boete aan de staatskas ter hoogte van de door u gestelde zekerheid. Tevens werd u medegedeeld dat de daad dan niet meer wordt bestraft als overtreding, maar dat de procedure, zonder dat bijkomende kosten ontstaan en registratie in het centrale federale strafregister geschiedt, definitief wordt geseponeerd. 
Als verdachte die tevens geïnformeerd werd dat anders een strafvervolging tegen u kan worden ingesteld, verklaart u zich akkoord met de seponering van de procedure en de van de door u gestelde zekerheid als boete overeenkomstig § 153a, eerste lid, StPO/Wetboek van strafvordering." 

Vermeld voor het geval dat een resterend bedrag aan u teruggegeven dient te worden eventueel de gegevens van uw eigen bank of van een andere bank. 

5 Met uw handtekening bevestigt u dat u een afschrift van het „proces-verbaal inzake een zekerheidsstelling“ en dit instructie-/voorlichtingsformulier heeft ontvangen. Die politieambtenaar bevestigt met zijn handtekening de ontvangst van de door u gestelde zekerheid.`
  },
  hr: { 
    security_deposit: ` Napomene/naputak o zapisniku o jamcevini:

1 Vaši osobni podaci kao okrivljenika(ice)/oštecene strane. 

2 Podaci o kaznenom djelu/prekršaju za koje Vas se optužuje, podaci o tijelima nadležnima za odredivanje jamcevine kao i njihova bankovna veza i oznaka blagajne. 

3 Buduci da nemate stalno prebivalište ili mjesto boravka u podrucju važenja doticnog zakona,

– možete u svrhu sprjecavanja Vašeg uhicenja (cl. 127a Zakona o kaznenom postupku [StPO])

– morate u svrhu osiguranja kaznenog postupka/postupka odredivanja visine globe (cl. 132 Zakona o kaznenom postupku), cl. 46 Prekršajnog zakona (OWiG) 

platiti jamcevinu za ocekivanu novcanu kaznu/globu kao i troškove postupka. Ukoliko nemate eure, jamcevinu možete realizirati u nekoj drugoj konvertibilnoj valuti, vrijednosnim papirima, davanjem stvari u zalog ili jamstvom odgovarajuceg treceg lica. 

Ako jamcevinu, u slucaju cl. 132 Zakona o kaznenom postupku (StPO), ne platite dobrovoljno i ne imenujete opunomocenika za primanje pismena, zaplijenit ce Vam se transportno sredstvo ili neki drugi predmeti koje imate sa sobom i koji Vam pripadaju. U tom smislu možete na nadležnom opcinskom sudu u svako doba zatražiti sudsku odluku (cl. 132 st. 3 u vezi s cl. 98 st. 2 Zakona o kaznenom postupku (StPO)). Imate mogucnost da doznakom jamcevine na racun naveden pod br. 2 i eventualno naknadnim imenovanjem opunomocenika za primanje pismena (v. br. 4), vratite zaplijenjene predmete. 

Novcani iznos odnosno predmeti biti ce predani nadležnom tijelu. U slucaju pravomocnog kažnjavanja jamcevina ce se obracunati s novcanom kaznom/globom i troškovima postupka, a zaplijenjeni predmet biti ce iskorišteni. Ako se novcana kazna/globa ne odredi ili se odredi u malom iznosu, preostali iznos novca odnosno stvari biti ce Vam vraceni. 

4 Imenovali ste osobu koja ima prebivalište u nadležnom sudskom okrugu za svog "ovlaštenog zastupnika za dostavu sudskih isprava". Ta će osoba primati dokumente od državnog odvjetništva ili suda u vaše ime i prosljeđivati ih vam. Ovlašteni zastupnik isključivo je odgovoran za prosljeđivanje službenih dokumenata punomoćniku i neće prihvaćati nikakve dokumente od punomoćnika. Punomoć izričito obuhvaća i primanje poziva upućenih osobno vama za glavnu raspravu i druge sudske rokove koje sud zakaže.
"Obaviješteni ste da, ukoliko javno tužiteljstvo ili sud namjeravaju obustaviti postupak izdanjem kaznene naloge, imate pravo prema članku 6. stavku 3. točki a) ESLJP-a da, uz njemačku kaznenu nalogu, dobijete prijevod na svoj materinji jezik."

Naputak prema cl. 153a Zakona o kaznenom postupku (StPO): 

"Obaviješteni ste o tome da državno odvjetništvo, s Vašom suglasnošcu prema cl.153a st. 1 Zakona o kaznenom postupku (StPO), može odustati od podizanja optužnice ako izvršite placanje globe u iznosu koji Vam je odreden jamcevinom, a u korist državne blagajne. Osim toga priopceno Vam je da se time djelo više ne kažnjava kao prijestup, vec se postupak konacno obustavlja bez nastajanja dodatnih troškova i unosa u savezni središnji registar. 
Kao okrivljenik(ica) koji/koja je obaviješten(a) o tome da se u suprotnom protiv njega/nje može podici javna tužba, suglasni ste s obustavom postupka i jamcevinom koju ste uplatili kao globu prema cl. 153a st. 1 Zakona o kaznenom postupku (StPO)." 

Molimo Vas da u slucaju da Vam se treba vratiti preostali iznos, navedete Vašu/neku drugu bankovnu vezu. 

5 Svojim potpisom potvrdujete da ste primili kopiju „Zapisnik o jamcevini“ i ovaj list s napomenama/naputkom. Policijska djelatnica/policijski djelatnik potvrduje svojim potpisom prijem jamcevine koju ste platili.`
  },
};

export default function App() {
  const [currentLang, setCurrentLang] = useState<string | null>(null);
  const [currentLegal, setCurrentLegal] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Sicherheitsleistung (mehrsprachig)";
  }, []);

  const resetToHome = () => {
    setCurrentLang(null);
    setCurrentLegal(null);
  };

  const goBack = () => {
    if (currentLegal) {
      setCurrentLegal(null);
    } else if (currentLang) {
      setCurrentLang(null);
    }
  };

  const renderLanguageSelection = () => {
    return (
      <div className="space-y-8 animate-fade-in-up">
        
        <div className={`max-w-2xl mx-auto p-1 rounded-2xl bg-gradient-to-r from-purple-400 to-fuchsia-500 shadow-lg shadow-purple-500/30`}>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center space-x-3">
            <Coins className="text-slate-700" size={24} strokeWidth={2} />
            <h2 className="text-xl font-bold text-slate-800">Sicherheitsleistung</h2>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">Sprache des Fahrers wählen</h3>
          <p className="text-slate-500 mt-2 font-medium">Select the driver's language</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 p-2 max-w-5xl mx-auto w-full">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setCurrentLang(lang.id)}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-purple-200 hover:-translate-y-1"
            >
              <div className="relative w-16 h-12 mb-4">
                <div className="absolute inset-0 bg-black/5 rounded-md transform group-hover:scale-110 transition-transform duration-300 blur-sm" />
                <img 
                  src={`https://flagcdn.com/w160/${lang.countryCode}.png`} 
                  alt={`${lang.name} Flagge`} 
                  className="relative w-full h-full object-cover rounded-md shadow-sm border border-slate-200 transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="font-bold text-slate-800 text-lg tracking-tight group-hover:text-purple-600 transition-colors">{lang.name}</span>
              <span className="text-xs font-medium text-slate-400 mt-1.5 uppercase tracking-wider">{lang.germanCountry}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTextView = () => {
    const selectedLangObj = LANGUAGES.find(l => l.id === currentLang);
    
    // @ts-ignore
    const textToDisplay = TEXT_DATABASE[currentLang]?.security_deposit || "Text noch nicht verfügbar.";

    return (
      <div className="p-2 sm:p-4 max-w-4xl mx-auto w-full animate-fade-in-up">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgb(0,0,0,0.08)] overflow-hidden border border-slate-100">
          
          <div className={`p-6 sm:p-8 bg-gradient-to-r from-purple-400 to-fuchsia-500 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden`}>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            
            <div className="flex items-center space-x-5 relative z-10">
              <img 
                src={`https://flagcdn.com/w80/${selectedLangObj?.countryCode}.png`} 
                alt="Flagge" 
                className="w-14 h-auto rounded-md shadow-md border-2 border-white/20"
              />
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Sicherheitsleistung</h2>
                <p className="text-white/80 font-medium mt-1">{selectedLangObj?.name}</p>
              </div>
            </div>
            <Coins size={48} className="text-white/90 drop-shadow-md relative z-10 hidden sm:block" strokeWidth={1.5} />
          </div>

          <div className="relative p-8 sm:p-14 min-h-[350px] flex items-center justify-start bg-slate-50/50">
            <div className="absolute top-10 right-10 text-slate-200/50">
              <MessageSquareQuote size={120} strokeWidth={1} />
            </div>
            
            <div className="relative z-10 text-xl sm:text-2xl text-slate-700 leading-relaxed font-semibold text-left tracking-tight whitespace-pre-wrap w-full">
              {textToDisplay}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderImpressum = () => (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 animate-fade-in-up">
      <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-8 text-center uppercase">Impressum</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Angaben gemäß § 5 TMG</h3>
          <p className="text-slate-600 leading-relaxed">
            Simon Demel<br />
            Ellen-Gottlieb Straße 15<br />
            79106 Freiburg im Breisgau
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Kontakt</h3>
          <p className="text-slate-600 leading-relaxed">
            E-Mail: <a href="mailto:simondemel@gmx.de" className="text-blue-600 hover:text-blue-800 transition-colors">simondemel@gmx.de</a>
          </p>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 animate-fade-in-up">
      <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-8 text-center">Datenschutzerklärung</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">1. Datenerfassung & Lokale Verarbeitung</h3>
          <p className="text-slate-600 leading-relaxed">
            Diese Applikation arbeitet vollständig lokal auf Ihrem Endgerät ("Client-Side"). Es werden von der Applikationslogik selbst keinerlei personenbezogene Daten an externe Server übertragen oder dort gespeichert.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">2. Hosting (Vercel)</h3>
          <p className="text-slate-600 leading-relaxed">
            Die Website wird bei Vercel gehostet. Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Wenn Sie die Website besuchen, erfasst Vercel serverseitig standardmäßig Verbindungsdaten (z. B. Ihre IP-Adresse, Browsertyp, Datum und Uhrzeit des Abrufs) in sogenannten Server-Logfiles, um die fehlerfreie Auslieferung der Website und die IT-Sicherheit zu gewährleisten. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Weitere Details finden Sie in der Datenschutzerklärung von Vercel.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">3. Cookies & Tracking</h3>
          <p className="text-slate-600 leading-relaxed">
            Diese Anwendung verwendet keine eigenen Tracking-Cookies oder Analyse-Werkzeuge (z. B. Google Analytics), um das Nutzerverhalten auszuwerten oder Profile zu erstellen.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>
      
      <div className="min-h-screen bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-100 font-sans flex flex-col">
        
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col pt-6 sm:pt-10">
          
          {(currentLang || currentLegal) && (
            <div className="flex items-center justify-between mb-8 w-full animate-fade-in-up">
              <button 
                onClick={goBack}
                className="group flex items-center space-x-2 bg-white shadow-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Zurück</span>
              </button>

              <button 
                onClick={resetToHome}
                className="p-2.5 bg-white shadow-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 rounded-xl transition-all duration-200"
                title="Zurück zum Start"
              >
                <Home size={20} />
              </button>
            </div>
          )}

          {!currentLegal && !currentLang && renderLanguageSelection()}
          {!currentLegal && currentLang && renderTextView()}
          {currentLegal === 'impressum' && renderImpressum()}
          {currentLegal === 'privacy' && renderPrivacy()}
        </main>

        <footer className="mt-auto py-6 border-t border-slate-200/60 bg-slate-50/30">
          <div className="max-w-6xl mx-auto px-4 flex justify-center space-x-6 text-sm font-medium text-slate-500">
            <button onClick={() => setCurrentLegal('impressum')} className="hover:text-slate-800 transition-colors">Impressum</button>
            <span>|</span>
            <button onClick={() => setCurrentLegal('privacy')} className="hover:text-slate-800 transition-colors">Datenschutz</button>
          </div>
        </footer>
      </div>
    </>
  );
}
