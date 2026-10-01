import { useState, useEffect } from 'react';
// @ts-ignore
import { ArrowLeft, Home, MessageSquareQuote, Coins } from 'lucide-react';

const LANGUAGES = [
  { id: 'de', name: 'Deutsch', germanCountry: 'Deutschland', countryCode: 'de' },
  { id: 'en', name: 'English', germanCountry: 'Großbritannien / Englisch', countryCode: 'gb' },
  { id: 'fr', name: 'Français', germanCountry: 'Frankreich', countryCode: 'fr' },
  { id: 'es', name: 'Español', germanCountry: 'Spanien', countryCode: 'es' },
  { id: 'it', name: 'Italiano', germanCountry: 'Italien', countryCode: 'it' },
  { id: 'ru', name: 'Русский', germanCountry: 'Russland', countryCode: 'ru' },
  { id: 'pl', name: 'Polski', germanCountry: 'Polen', countryCode: 'pl' },
  { id: 'ro', name: 'Română', germanCountry: 'Rumänien', countryCode: 'ro' },
  { id: 'tr', name: 'Türkçe', germanCountry: 'Türkei', countryCode: 'tr' },
  { id: 'sl', name: 'Slovenščina', germanCountry: 'Slowenien', countryCode: 'si' },
  { id: 'hu', name: 'Magyar', germanCountry: 'Ungarn', countryCode: 'hu' },
  { id: 'uk', name: 'Українська', germanCountry: 'Ukraine', countryCode: 'ua' },
  { id: 'hi', name: 'हिन्दी', germanCountry: 'Indien', countryCode: 'in' },
  { id: 'bg', name: 'Български', germanCountry: 'Bulgarien', countryCode: 'bg' },
  { id: 'cs', name: 'Čeština', germanCountry: 'Tschechien', countryCode: 'cz' },
  { id: 'lt', name: 'Lietuvių', germanCountry: 'Litauen', countryCode: 'lt' },
  { id: 'nl', name: 'Nederlands', germanCountry: 'Niederlande', countryCode: 'nl' },
  { id: 'hr', name: 'Hrvatski', germanCountry: 'Kroatien', countryCode: 'hr' },
];

const TEXT_DATABASE = {
  de: {
    security_deposit: `1 Angabe Ihrer Personalien als Beschuldigte(r)/Betroffene(r).

2 Angabe der Straftat/Ordnungswidrigkeit, die Ihnen vorgeworfen wird, der für die Sicherheitsleistung zuständigen Behörde sowie deren Bankverbindung und Kassenzeichen.

3 Da Sie im Geltungsbereich des betreffenden Gesetzes keinen festen Wohnsitz oder Aufenthalt haben
– können Sie zur Abwendung Ihrer Festnahme (§ 127a Strafprozessordnung [StPO])
– müssen Sie zur Sicherstellung des Straf-/Bußgeldverfahrens (§ 132 StPO), § 46 des Gesetzes über Ordnungswidrigkeiten (OWiG)
für die zu erwartende Geldstrafe/Geldbuße sowie für die Kosten des Verfahrens eine Sicherheit leisten. Die Sicherheit kann, falls Sie nicht über Euro verfügen, in einer anderen konvertierbaren Währung, in Wertpapieren, durch Pfandbestellung oder durch Bürgschaft geeigneter Dritter geleistet werden.

Wenn Sie im Falle des § 132 StPO die Sicherheitsleistung nicht freiwillig erbringen und eine/einen Zustellungsbevollmächtigte(n) nicht benennen, werden Beförderungsmittel oder andere Gegenstände, die Sie mit sich führen und die Ihnen gehören, beschlagnahmt. Sie können hierzu jederzeit beim zuständigen Amtsgericht die richterliche Entscheidung beantragen (§ 132 Abs. 3 i.V.m. § 98 Abs. 2 StPO). Sie haben die Möglichkeit, die beschlagnahmten Gegenstände durch Überweisung der Sicherheitsleistung auf das unter Nr. 2 angegebene Konto und ggf. durch nachträgliche Benennung einer/eines Zustellungsbevollmächtigten (s. Nr. 4) wieder auszulösen.

Der Geldbetrag bzw. die Gegenstände werden an die zuständige Behörde abgegeben. Im Falle der rechtskräftigen Ahndung wird die Sicherheitsleistung mit der Geldstrafe/-buße und den Kosten des Verfahrens verrechnet sowie die ggf. beschlagnahmten Sachen verwertet. Wird keine oder eine Geldstrafe/-buße in geringerer Höhe festgesetzt, so wird der verbleibende Betrag oder die Sache an Sie zurückgegeben.

4 Belehrung gemäß § 153a StPO:
"Sie wurden darüber belehrt, dass die Staatsanwaltschaft mit Ihrer Zustimmung gemäß § 153a Abs. 1 der Strafprozessordnung (StPO) von einer Anklageerhebung gegen Zahlung einer Buße in Höhe der von Ihnen aufgebrachten Sicherheitsleistung zugunsten der Staatskasse absehen kann. Außerdem wurde Ihnen eröffnet, dass die Tat sodann nicht mehr als Vergehen bestraft wird, sondern das Verfahren, ohne dass zusätzliche Kosten entstehen und eine Eintragung in das Bundeszentralregister erfolgt, endgültig eingestellt wird.
Als Beschuldigte(r) die/der darüber hinaus belehrt wurde, dass andernfalls die öffentliche Klage gegen sie/ihn erhoben werden kann, sind Sie mit der Einstellung des Verfahrens und der von Ihnen aufgebrachten Sicherheitsleistung als Buße gemäß § 153a Abs. 1 StPO einverstanden."

Geben Sie bitte für den Fall, dass ein verbleibender Betrag an Sie zurückgegeben werden muss, ggf. Ihre/eine andere Bankverbindung an.

5 Sie bestätigen mit Ihrer Unterschrift, eine Durchschrift der „Niederschrift über eine Sicherheitsleistung“ und dieses Hinweis-/Belehrungsblatt erhalten zu haben. Die/Der Polizeibeamtin/Polizeibeamte bestätigt durch Unterschrift den Empfang der von Ihnen geleisteten Sicherheit.`
  },
  en: { 
    security_deposit: `1 Details of your personal data as the accused/affected person.

2 Details of the criminal offense/administrative offense of which you are accused, the authority responsible for the security deposit, and its bank details and reference number.

3 Since you do not have a fixed residence or whereabouts within the scope of the relevant law
– you may, to avert your arrest (Sec. 127a of the Code of Criminal Procedure [StPO])
– you must, to secure the criminal/fine proceedings (Sec. 132 StPO), Sec. 46 of the Act on Regulatory Offenses (OWiG)
provide security for the expected fine/penalty and for the costs of the proceedings. If you do not have Euros, the security can be provided in another convertible currency, in securities, by pledging, or by a guarantee from suitable third parties.

If, in the case of Sec. 132 StPO, you do not voluntarily provide the security deposit and do not name an authorized recipient for service of documents, means of transport or other objects that you are carrying with you and that belong to you will be confiscated. You can apply for a judicial decision on this at any time from the competent local court (Sec. 132 (3) in conjunction with Sec. 98 (2) StPO). You have the option of releasing the confiscated items by transferring the security deposit to the account specified under No. 2 and, if applicable, by subsequently naming an authorized recipient for service of documents (see No. 4).

The amount of money or the items will be handed over to the competent authority. In the event of a legally binding punishment, the security deposit will be offset against the fine/penalty and the costs of the proceedings, and any confiscated items will be utilized. If no fine/penalty or a fine/penalty in a lower amount is set, the remaining amount or the item will be returned to you.

4 Instruction pursuant to Sec. 153a StPO:
"You have been informed that the public prosecutor's office, with your consent, pursuant to Sec. 153a (1) of the Code of Criminal Procedure (StPO), may refrain from bringing charges in return for payment of a fine in the amount of the security deposit provided by you in favor of the state treasury. You have also been informed that the act will then no longer be punished as an offense, but the proceedings will be finally discontinued without incurring additional costs and without an entry in the Federal Central Criminal Register.
As an accused person who has also been informed that otherwise public charges may be brought against you, you agree to the discontinuation of the proceedings and the security deposit provided by you as a fine pursuant to Sec. 153a (1) StPO."

Please provide your/another bank connection in case a remaining amount must be returned to you.

5 By signing, you confirm that you have received a copy of the "Record of a Security Deposit" and this information/instruction sheet. The police officer confirms receipt of the security provided by you with their signature.`
  },
  fr: { 
    security_deposit: `1 Indication de vos données personnelles en tant qu'accusé(e)/personne concernée.

2 Indication de l'infraction pénale/infraction administrative qui vous est reprochée, de l'autorité compétente pour le dépôt de garantie, ainsi que de ses coordonnées bancaires et de son numéro de référence.

3 Étant donné que vous n'avez ni domicile fixe ni résidence dans le champ d'application de la loi concernée
– vous pouvez, pour éviter votre arrestation (art. 127a du Code de procédure pénale [StPO])
– vous devez, pour garantir la procédure pénale/d'amende (art. 132 StPO), art. 46 de la loi sur les infractions administratives (OWiG)
fournir une garantie pour l'amende/la peine pécuniaire attendue ainsi que pour les frais de la procédure. Si vous ne disposez pas d'euros, la garantie peut être fournie dans une autre monnaie convertible, en valeurs mobilières, par mise en gage ou par le cautionnement de tiers appropriés.

Si, dans le cas de l'art. 132 StPO, vous ne fournissez pas volontairement le dépôt de garantie et ne désignez pas de mandataire pour la signification des actes, les moyens de transport ou autres objets que vous transportez avec vous et qui vous appartiennent seront confisqués. Vous pouvez demander à tout moment une décision judiciaire à ce sujet auprès du tribunal d'instance compétent (art. 132 al. 3 en liaison avec l'art. 98 al. 2 StPO). Vous avez la possibilité de récupérer les objets confisqués en transférant le dépôt de garantie sur le compte indiqué au point 2 et, le cas échéant, en désignant ultérieurement un mandataire pour la signification (voir point 4).

La somme d'argent ou les objets seront remis à l'autorité compétente. En cas de condamnation ayant force de chose jugée, le dépôt de garantie sera compensé par l'amende/la peine pécuniaire et les frais de la procédure, et les objets éventuellement confisqués seront valorisés. Si aucune amende/peine pécuniaire ou une amende/peine pécuniaire d'un montant inférieur est fixée, le montant restant ou l'objet vous sera restitué.

4 Instruction conformément à l'art. 153a StPO :
"Vous avez été informé(e) que le ministère public, avec votre consentement, conformément à l'art. 153a al. 1 du Code de procédure pénale (StPO), peut s'abstenir de porter des accusations en échange du paiement d'une amende d'un montant égal au dépôt de garantie que vous avez fourni en faveur du Trésor public. Il vous a également été communiqué que l'acte ne sera alors plus puni comme une infraction, mais que la procédure sera définitivement classée sans frais supplémentaires et sans inscription au casier judiciaire central fédéral.
En tant qu'accusé(e) qui a par ailleurs été informé(e) qu'à défaut, des accusations publiques pourraient être portées contre vous, vous acceptez le classement de la procédure et le dépôt de garantie que vous avez fourni en tant qu'amende conformément à l'art. 153a al. 1 StPO."

Veuillez indiquer vos coordonnées bancaires ou d'autres coordonnées bancaires au cas où un montant restant devrait vous être restitué.

5 Par votre signature, vous confirmez avoir reçu une copie du "Procès-verbal relatif à un dépôt de garantie" et de la présente fiche d'information/d'instruction. L'agent(e) de police confirme par sa signature la réception de la garantie que vous avez fournie.`
  },
  
  es: { 
    security_deposit: `1 Indicación de sus datos personales como acusado/afectado.

2 Indicación del delito penal/infracción administrativa que se le imputa, de la autoridad responsable de la fianza, así como de sus datos bancarios y número de referencia.

3 Dado que no tiene un domicilio fijo o residencia en el ámbito de aplicación de la ley pertinente
– puede, para evitar su arresto (Art. 127a de la Ley de Enjuiciamiento Criminal [StPO])
– debe, para asegurar el procedimiento penal/de multa (Art. 132 StPO), Art. 46 de la Ley de Infracciones Administrativas (OWiG)
prestar una fianza para la multa/sanción esperada, así como para las costas del procedimiento. Si no dispone de euros, la fianza puede prestarse en otra moneda convertible, en valores, mediante prenda o mediante garantía de terceros idóneos.

Si, en el caso del Art. 132 StPO, no presta voluntariamente la fianza y no nombra a un representante para notificaciones, se confiscarán los medios de transporte u otros objetos que lleve consigo y que le pertenezcan. Puede solicitar una decisión judicial al respecto en cualquier momento ante el tribunal de distrito competente (Art. 132 apdo. 3 en relación con el Art. 98 apdo. 2 StPO). Tiene la opción de liberar los objetos confiscados transfiriendo la fianza a la cuenta especificada en el punto 2 y, si procede, nombrando posteriormente a un representante para notificaciones (ver punto 4).

La cantidad de dinero o los objetos se entregarán a la autoridad competente. En caso de una sanción jurídicamente vinculante, la fianza se compensará con la multa/sanción y las costas del procedimiento, y se utilizarán los objetos confiscados, en su caso. Si no se fija ninguna multa/sanción o si se fija una multa/sanción por un importe inferior, se le devolverá la cantidad restante o el objeto.

4 Instrucción conforme al Art. 153a StPO:
"Se le ha informado que el ministerio público, con su consentimiento, conforme al Art. 153a apdo. 1 de la Ley de Enjuiciamiento Criminal (StPO), puede abstenerse de presentar cargos a cambio del pago de una multa por el importe de la fianza que usted ha aportado a favor del erario público. También se le ha informado que el acto ya no será castigado como un delito, sino que el procedimiento se sobreseerá definitivamente sin incurrir en costes adicionales y sin que se realice una inscripción en el Registro Central Federal.
Como acusado que también ha sido informado de que, de lo contrario, se podrían presentar cargos públicos contra usted, acepta el sobreseimiento del procedimiento y la fianza que ha aportado como multa conforme al Art. 153a apdo. 1 StPO."

Por favor, indique sus datos bancarios u otros datos bancarios en caso de que se le deba devolver una cantidad restante.

5 Con su firma confirma haber recibido una copia del "Acta sobre una fianza" y de esta hoja de información/instrucción. El/la oficial de policía confirma con su firma la recepción de la fianza prestada por usted.`
  },
  it: { 
    security_deposit: `1 Indicazione delle Sue generalità in qualità di indagato/interessato.

2 Indicazione del reato penale/illecito amministrativo che Le viene contestato, dell'autorità competente per il deposito cauzionale, nonché delle sue coordinate bancarie e del numero di riferimento.

3 Poiché non ha un domicilio fisso o una residenza nell'ambito di applicazione della legge in questione
– può, per evitare il Suo arresto (Art. 127a del Codice di Procedura Penale [StPO])
– deve, per garantire il procedimento penale/per sanzione amministrativa (Art. 132 StPO), Art. 46 della Legge sulle violazioni amministrative (OWiG)
prestare una cauzione per la multa/sanzione prevista e per le spese del procedimento. Qualora non disponga di Euro, la cauzione può essere prestata in un'altra valuta convertibile, in titoli, mediante pegno o tramite fideiussione di terzi idonei.

Se, nel caso dell'Art. 132 StPO, non versa volontariamente il deposito cauzionale e non nomina un domiciliatario, i mezzi di trasporto o altri oggetti che porta con Sé e che Le appartengono saranno sequestrati. Può richiedere in qualsiasi momento una decisione giudiziaria al riguardo presso il tribunale distrettuale competente (Art. 132 comma 3 in combinato disposto con l'Art. 98 comma 2 StPO). Ha la possibilità di sbloccare gli oggetti sequestrati trasferendo il deposito cauzionale sul conto indicato al punto 2 e, se del caso, nominando successivamente un domiciliatario (vedi punto 4).

La somma di denaro o gli oggetti saranno consegnati all'autorità competente. In caso di condanna passata in giudicato, il deposito cauzionale sarà compensato con la multa/sanzione e le spese del procedimento e gli oggetti eventualmente sequestrati saranno valorizzati. Se non viene stabilita alcuna multa/sanzione o viene stabilita una multa/sanzione di importo inferiore, l'importo rimanente o l'oggetto Le sarà restituito.

4 Informazione ai sensi dell'Art. 153a StPO:
"È stato/a informato/a che il pubblico ministero, con il Suo consenso, ai sensi dell'Art. 153a comma 1 del Codice di Procedura Penale (StPO), può astenersi dal promuovere l'azione penale a fronte del pagamento di una sanzione pecuniaria pari all'importo del deposito cauzionale da Lei versato a favore dell'erario. Le è stato inoltre comunicato che il fatto non sarà quindi più punito come reato, ma che il procedimento sarà definitivamente archiviato senza ulteriori costi e senza che venga effettuata alcuna iscrizione nel casellario giudiziale centrale federale.
In qualità di indagato/a che è stato/a inoltre informato/a che, in caso contrario, potrebbe essere promossa l'azione penale pubblica nei Suoi confronti, acconsente all'archiviazione del procedimento e al deposito cauzionale da Lei versato a titolo di sanzione pecuniaria ai sensi dell'Art. 153a comma 1 StPO."

Si prega di fornire le proprie coordinate bancarie o altre coordinate bancarie nel caso in cui un importo residuo debba esserLe restituito.

5 Con la Sua firma conferma di aver ricevuto una copia del "Verbale relativo a un deposito cauzionale" e di questo foglio informativo/di istruzioni. L'ufficiale di polizia conferma con la propria firma la ricezione della cauzione da Lei prestata.`
  },
  ru: { 
    security_deposit: `1 Указание ваших персональных данных в качестве обвиняемого/потерпевшего.

2 Указание уголовного преступления/административного правонарушения, в котором вас обвиняют, органа, ответственного за внесение залога, а также его банковских реквизитов и номера квитанции.

3 Поскольку у вас нет постоянного места жительства или пребывания в зоне действия соответствующего закона
– вы можете во избежание задержания (§ 127a Уголовно-процессуального кодекса [StPO])
– вы должны для обеспечения уголовного производства/производства по делу об административном правонарушении (§ 132 StPO), § 46 Закона об административных правонарушениях (OWiG)
внести залог за ожидаемый штраф/пеню, а также за судебные издержки. Если у вас нет евро, залог может быть внесен в другой конвертируемой валюте, в ценных бумагах, путем залога имущества или поручительства подходящих третьих лиц.

Если в случае § 132 StPO вы не внесете залог добровольно и не назначите уполномоченного на получение документов, транспортные средства или другие предметы, которые вы везете с собой и которые вам принадлежат, будут конфискованы. Вы можете в любое время подать заявление о принятии судебного решения по этому поводу в компетентный участковый суд (§ 132 абз. 3 в сочетании с § 98 абз. 2 StPO). У вас есть возможность выкупить конфискованные предметы, перечислив залог на счет, указанный в п. 2, и, при необходимости, дополнительно назначив уполномоченного на получение документов (см. п. 4).

Денежная сумма или предметы передаются компетентному органу. В случае вступления наказания в законную силу залог засчитывается в счет штрафа/пени и судебных издержек, а конфискованные предметы, при их наличии, реализуются. Если штраф/пеня не назначается или назначается в меньшем размере, оставшаяся сумма или предмет возвращается вам.

4 Разъяснение согласно § 153a StPO:
"Вам было разъяснено, что прокуратура с вашего согласия в соответствии с § 153a абз. 1 Уголовно-процессуального кодекса (StPO) может отказаться от предъявления обвинения в обмен на выплату штрафа в размере внесенного вами залога в пользу государственной казны. Кроме того, вам было сообщено, что деяние в таком случае больше не будет наказываться как правонарушение, а дело будет окончательно прекращено без дополнительных расходов и внесения записи в Федеральный центральный реестр судимостей.
Как обвиняемый, которому дополнительно было разъяснено, что в противном случае против него может быть выдвинуто публичное обвинение, вы согласны с прекращением дела и внесением внесенного вами залога в качестве штрафа согласно § 153a абз. 1 StPO."

Пожалуйста, укажите свои/иные банковские реквизиты на случай, если оставшаяся сумма должна быть вам возвращена.

5 Своей подписью вы подтверждаете получение копии "Протокола о внесении залога" и данного информационного/инструктивного листа. Сотрудник полиции подтверждает получение внесенного вами залога своей подписью.`
  },
  pl: { 
    security_deposit: `1 Podanie danych osobowych jako oskarżonego/osoby, której dotyczy postępowanie.

2 Podanie przestępstwa/wykroczenia, o które jesteś oskarżony, organu odpowiedzialnego za wpłatę kaucji oraz jego danych bankowych i numeru referencyjnego.

3 Ponieważ nie posiadasz stałego miejsca zamieszkania ani pobytu na obszarze objętym daną ustawą
– możesz, w celu uniknięcia aresztowania (§ 127a Kodeksu Postępowania Karnego [StPO])
– musisz, w celu zabezpieczenia postępowania karnego/w sprawie o wykroczenie (§ 132 StPO), § 46 Ustawy o wykroczeniach (OWiG)
wnieść kaucję na poczet przewidywanej grzywny/kary pieniężnej oraz kosztów postępowania. Jeżeli nie posiadasz waluty Euro, kaucja może zostać wniesiona w innej walucie wymienialnej, w papierach wartościowych, w formie zastawu lub poręczenia udzielonego przez odpowiednie osoby trzecie.

Jeżeli w przypadku § 132 StPO nie wniesiesz kaucji dobrowolnie i nie wyznaczysz pełnomocnika do doręczeń, środki transportu lub inne przedmioty, które posiadasz przy sobie i które należą do Ciebie, zostaną zajęte. Możesz w każdej chwili złożyć wniosek o wydanie orzeczenia sądowego w tej sprawie do właściwego sądu rejonowego (§ 132 ust. 3 w zw. z § 98 ust. 2 StPO). Masz możliwość zwolnienia zajętych przedmiotów, przelewając kwotę kaucji na konto wskazane w pkt 2 i, w stosownych przypadkach, wyznaczając następnie pełnomocnika do doręczeń (patrz pkt 4).

Kwota pieniężna lub przedmioty zostaną przekazane właściwemu organowi. W przypadku prawomocnego ukarania, kaucja zostanie zaliczona na poczet grzywny/kary pieniężnej i kosztów postępowania, a ewentualnie zajęte przedmioty zostaną spieniężone. Jeżeli nie zostanie wymierzona żadna grzywna/kara pieniężna lub zostanie wymierzona w niższej wysokości, pozostała kwota lub przedmiot zostaną Ci zwrócone.

4 Pouczenie zgodnie z § 153a StPO:
"Zostałeś poinformowany, że prokuratura, za Twoją zgodą, zgodnie z § 153a ust. 1 Kodeksu Postępowania Karnego (StPO), może odstąpić od wniesienia aktu oskarżenia w zamian za zapłacenie nawiązki w wysokości wniesionej przez Ciebie kaucji na rzecz Skarbu Państwa. Zostałeś również poinformowany, że czyn ten nie będzie wówczas karany jako przestępstwo, ale postępowanie zostanie ostatecznie umorzone bez ponoszenia dodatkowych kosztów i bez wpisu do Federalnego Rejestru Centralnego.
Jako oskarżony, który został dodatkowo poinformowany, że w przeciwnym razie może zostać wniesiony przeciwko Tobie akt oskarżenia, wyrażasz zgodę na umorzenie postępowania i wniesioną przez Ciebie kaucję jako nawiązkę zgodnie z § 153a ust. 1 StPO."

Prosimy o podanie danych swojego/innego konta bankowego na wypadek konieczności zwrotu pozostałej kwoty.

5 Swoim podpisem potwierdzasz odbiór kopii "Protokołu wniesienia kaucji" oraz niniejszego arkusza informacyjnego/pouczenia. Funkcjonariusz policji potwierdza swoim podpisem odbiór wniesionej przez Ciebie kaucji.`
  },
  
  ro: { 
    security_deposit: `1 Furnizarea datelor dumneavoastră personale în calitate de persoană acuzată/implicată.

2 Furnizarea detaliilor referitoare la infracțiunea/contravenția de care sunteți acuzat, autoritatea responsabilă pentru cauțiune, precum și detaliile bancare și numărul de referință ale acesteia.

3 Deoarece nu aveți domiciliul stabil sau reședința în aria de aplicare a legii relevante
– puteți, pentru a evita arestarea dumneavoastră (Secțiunea 127a din Codul de Procedură Penală [StPO])
– trebuie, pentru a asigura procedurile penale/contravenționale (Secțiunea 132 StPO), Secțiunea 46 din Legea privind contravențiile administrative (OWiG)
să oferiți o garanție pentru amenda prevăzută și pentru costurile procedurii. Dacă nu dispuneți de euro, garanția poate fi oferită într-o altă monedă convertibilă, în valori mobiliare, prin gaj sau printr-o garanție din partea unor terți corespunzători.

Dacă, în cazul Secțiunii 132 StPO, nu oferiți în mod voluntar cauțiunea și nu numiți un mandatar pentru comunicarea documentelor, mijloacele de transport sau alte obiecte pe care le aveți asupra dumneavoastră și care vă aparțin vor fi confiscate. Puteți solicita oricând o decizie judecătorească în acest sens de la judecătoria competentă (Secțiunea 132 alin. 3 coroborat cu Secțiunea 98 alin. 2 StPO). Aveți opțiunea de a elibera obiectele confiscate prin transferarea cauțiunii în contul specificat la punctul 2 și, dacă este cazul, prin numirea ulterioară a unui mandatar pentru comunicare (a se vedea punctul 4).

Suma de bani sau obiectele vor fi predate autorității competente. În cazul unei pedepse definitive, cauțiunea va fi compensată cu amenda și cu costurile procedurii, iar eventualele bunuri confiscate vor fi valorificate. Dacă nu este stabilită nicio amendă sau este stabilită o amendă într-un cuantum mai mic, suma rămasă sau obiectul vă vor fi returnate.

4 Instrucțiuni în conformitate cu Secțiunea 153a StPO:
„Ați fost informat că parchetul, cu consimțământul dumneavoastră, în conformitate cu Secțiunea 153a alin. 1 din Codul de procedură penală (StPO), poate renunța la formularea acuzațiilor în schimbul plății unei amenzi în cuantumul cauțiunii oferite de dumneavoastră în favoarea trezoreriei statului. De asemenea, vi s-a adus la cunoștință că fapta nu va mai fi pedepsită ca infracțiune, ci procedura va fi oprită definitiv fără a se suporta costuri suplimentare și fără o înregistrare în Registrul Judiciar Central Federal.
În calitate de persoană acuzată care a fost, de asemenea, informată că, în caz contrar, se pot aduce acuzații publice împotriva dumneavoastră, sunteți de acord cu oprirea procedurii și cu cauțiunea oferită de dumneavoastră sub formă de amendă în conformitate cu Secțiunea 153a alin. 1 StPO.”

Vă rugăm să furnizați detaliile dumneavoastră bancare sau ale altui cont bancar în cazul în care o sumă rămasă trebuie să vă fie returnată.

5 Prin semnătura dumneavoastră, confirmați că ați primit o copie a „Procesului-verbal privind plata unei cauțiuni” și a acestei fișe de informare/instrucțiuni. Ofițerul de poliție confirmă primirea garanției oferite de dumneavoastră prin semnătura sa.`
  },
  tr: { 
    security_deposit: `1 Şüpheli/İlgili kişi olarak kişisel verilerinizin belirtilmesi.

2 Size yöneltilen suç/idari para cezasının, teminattan sorumlu makamın ve bu makamın banka bilgileri ile referans numarasının belirtilmesi.

3 İlgili yasanın geçerli olduğu alanda sabit bir ikametgahınız veya kalış yeriniz olmadığı için
– tutuklanmanızı önlemek için (Alman Ceza Muhakemesi Kanunu [StPO] Madde 127a)
– ceza/para cezası işlemlerini güvence altına almak için (StPO Madde 132), İdari Suçlar Kanunu (OWiG) Madde 46 uyarınca
beklenen para cezası ve işlem masrafları için bir teminat göstermeniz gerekir. Euro'nuz yoksa, teminat başka bir dönüştürülebilir para biriminde, menkul kıymetlerde, rehin verilerek veya uygun üçüncü şahısların garantisi ile gösterilebilir.

StPO Madde 132 durumunda, teminatı gönüllü olarak yatırmazsanız ve belgelerin tebliği için yetkili bir temsilci atamazsanız, yanınızda taşıdığınız ve size ait olan ulaşım araçlarına veya diğer nesnelere el konulacaktır. Bu konuda yetkili yerel mahkemeden her zaman adli bir karar talep edebilirsiniz (StPO Madde 132 (3) ile bağlantılı olarak Madde 98 (2)). El konulan eşyaları, teminat tutarını 2 numarada belirtilen hesaba havale ederek ve gerekirse daha sonra belgelerin tebliği için yetkili bir temsilci atayarak (bkz. No. 4) geri alma seçeneğiniz vardır.

Para miktarı veya nesneler yetkili makama teslim edilecektir. Yasal olarak bağlayıcı bir ceza durumunda, teminat para cezası ve işlem masraflarından düşülecek ve el konulan eşyalar değerlendirilecektir. Herhangi bir para cezası belirlenmezse veya daha düşük bir miktarda belirlenirse, kalan miktar veya nesne size iade edilecektir.

4 StPO Madde 153a uyarınca bilgilendirme:
"Savcılığın, onayınızla, Alman Ceza Muhakemesi Kanunu'nun (StPO) 153a (1) maddesi uyarınca, devlet hazinesi lehine tarafınızca sağlanan teminat tutarında bir para cezasının ödenmesi karşılığında suçlamada bulunmaktan vazgeçebileceği konusunda bilgilendirildiniz. Ayrıca eylemin artık bir suç olarak cezalandırılmayacağı, ancak işlemlerin ek masraf doğurmadan ve Federal Merkezi Adli Sicil Kaydı'na bir giriş yapılmadan nihai olarak durdurulacağı da size bildirildi.
Aksi takdirde hakkınızda kamu davası açılabileceği konusunda da bilgilendirilmiş bir şüpheli olarak, işlemlerin durdurulmasını ve StPO Madde 153a (1) uyarınca tarafınızca sağlanan teminatın para cezası olarak kullanılmasını kabul ediyorsunuz."

Kalan bir miktarın size iade edilmesi gerekebileceği için lütfen kendi/başka bir banka hesap bilgilerinizi verin.

5 İmzanızla, "Teminat Makbuzu"nun bir kopyasını ve bu bilgi/talimat formunu aldığınızı onaylıyorsunuz. Polis memuru, sağladığınız teminatın alındığını imzasıyla teyit eder.`
  },
  sl: { 
    security_deposit: `1 Navedba vaših osebnih podatkov kot obdolženca/prizadete osebe.

2 Navedba kaznivega dejanja/prekrška, ki se vam očita, organa, pristojnega za varščino, ter njegovih bančnih podatkov in referenčne številke.

3 Ker na območju veljavnosti zadevnega zakona nimate stalnega prebivališča ali bivališča
– lahko za preprečitev aretacije (127.a člen Zakona o kazenskem postopku [StPO])
– morate za zavarovanje kazenskega/prekrškovnega postopka (132. člen StPO), 46. člen Zakona o prekrških (OWiG)
zagotoviti varščino za pričakovano denarno kazen/globo ter za stroške postopka. Če ne razpolagate z evri, se varščina lahko položi v drugi zamenljivi valuti, v vrednostnih papirjih, z zastavo ali z garancijo ustreznih tretjih oseb.

Če v primeru 132. člena StPO varščine ne položite prostovoljno in ne določite pooblaščenca za vročanje, se vam zasežejo prevozna sredstva ali drugi predmeti, ki jih imate pri sebi in so vaša last. Zoper to lahko kadar koli zahtevate sodno odločbo pri pristojnem okrajnem sodišču (tretji odstavek 132. člena v povezavi z drugim odstavkom 98. člena StPO). Zasežene predmete imate možnost odkupiti z nakazilom varščine na račun, naveden pod točko 2, in po potrebi z naknadnim imenovanjem pooblaščenca za vročanje (glej točko 4).

Denarni znesek ali predmeti se izročijo pristojnemu organu. V primeru pravnomočne kazni se varščina pobota z denarno kaznijo/globo in stroški postopka, morebitni zaseženi predmeti pa se unovčijo. Če denarna kazen/globa ni določena ali je določena v nižjem znesku, se vam preostali znesek ali predmet vrne.

4 Pouk v skladu s 153.a členom StPO:
"Poučeni ste bili, da lahko državno tožilstvo z vašim soglasjem v skladu s prvim odstavkom 153.a člena Zakona o kazenskem postopku (StPO) opusti vložitev obtožnice v zameno za plačilo globe v višini varščine, ki ste jo položili v korist državne blagajne. Sporočeno vam je bilo tudi, da se dejanje nato ne bo več kaznovalo kot prekršek, temveč se bo postopek dokončno ustavil brez dodatnih stroškov in brez vpisa v zvezni centralni kazenski register.
Kot obdolženec, ki je bil dodatno poučen, da bi se v nasprotnem primeru proti vam lahko vložila javna obtožba, soglašate z ustavitvijo postopka in z varščino, ki ste jo položili kot globo v skladu s prvim odstavkom 153.a člena StPO."

Prosimo, da navedete svoje/druge bančne podatke za primer, če vam bo treba vrniti preostali znesek.

5 S svojim podpisom potrjujete, da ste prejeli izvod "Zapisnika o položitvi varščine" in tega informativnega/poučnega lista. Policist s svojim podpisom potrjuje prejem varščine, ki ste jo položili.`
  },
  hu: { 
    security_deposit: `1 Személyes adatainak megadása vádlottként/érintett személyként.

2 Annak a bűncselekménynek/szabálysértésnek a megadása, amellyel vádolják, a biztosítékért felelős hatóság, valamint annak banki adatai és hivatkozási száma.

3 Mivel Önnek nincs állandó lakóhelye vagy tartózkodási helye a vonatkozó törvény hatálya alá tartozó területen
– letartóztatása elkerülése érdekében (a büntetőeljárási törvény [StPO] 127a. §-a)
– a büntető-/szabálysértési eljárás biztosítása érdekében (StPO 132. §), a szabálysértési törvény (OWiG) 46. §-a alapján
biztosítékot kell nyújtania a várható pénzbírságra/büntetésre, valamint az eljárás költségeire. Ha nem rendelkezik euróval, a biztosíték nyújtható más konvertibilis valutában, értékpapírokban, zálogjogosultként vagy megfelelő harmadik felek kezességvállalásával.

Ha az StPO 132. §-a esetén nem nyújtja önként a biztosítékot, és nem nevez meg kézbesítési meghatalmazottat, a magánál tartott és az Ön tulajdonát képező szállítóeszközöket vagy egyéb tárgyakat lefoglalják. Erre vonatkozóan bármikor kérhet bírói határozatot az illetékes kerületi bíróságtól (StPO 132. § (3) bekezdés összefüggésben a 98. § (2) bekezdéssel). Lehetősége van a lefoglalt tárgyak kiváltására a biztosíték 2. pontban megadott számlára történő átutalásával és adott esetben egy kézbesítési meghatalmazott utólagos megnevezésével (lásd a 4. pontot).

A pénzösszeget vagy a tárgyakat átadják az illetékes hatóságnak. Jogerős büntetés esetén a biztosítékot beszámítják a pénzbírságba/büntetésbe és az eljárás költségeibe, az esetlegesen lefoglalt tárgyakat pedig értékesítik. Ha nem szabnak ki pénzbírságot/büntetést, vagy alacsonyabb összegű pénzbírságot/büntetést szabnak ki, a fennmaradó összeget vagy a tárgyat visszaszolgáltatják Önnek.

4 Tájékoztatás az StPO 153a. §-a alapján:
"Tájékoztatták, hogy az ügyészség az Ön hozzájárulásával, a büntetőeljárási törvény (StPO) 153a. § (1) bekezdése értelmében eltekinthet a vádemeléstől, cserébe az Ön által az államkincstár javára nyújtott biztosíték összegének megfelelő bírság megfizetéséért. Azt is közölték Önnel, hogy a cselekményt ezt követően már nem büntetik szabálysértésként, hanem az eljárást véglegesen megszüntetik anélkül, hogy további költségek merülnének fel, és anélkül, hogy bejegyzés történne a Szövetségi Központi Nyilvántartásba.
Vádlottként, akit arról is tájékoztattak, hogy ellenkező esetben közvád emelhető Ön ellen, Ön hozzájárul az eljárás megszüntetéséhez és az Ön által nyújtott biztosítéknak az StPO 153a. § (1) bekezdése szerinti bírságként történő felhasználásához."

Kérjük, adja meg saját/egyéb banki adatait arra az esetre, ha a fennmaradó összeget vissza kellene téríteni Önnek.

5 Aláírásával megerősíti, hogy megkapta a "Biztosíték nyújtásáról szóló jegyzőkönyv" másolatát és ezt a tájékoztató/oktató lapot. A rendőrtiszt aláírásával igazolja az Ön által nyújtott biztosíték átvételét.`
  },
  
  uk: { 
    security_deposit: `1 Зазначення ваших персональних даних як обвинуваченого/потерпілого.

2 Зазначення кримінального правопорушення/адміністративного правопорушення, у якому вас звинувачують, органу, відповідального за внесення застави, а також його банківських реквізитів і номера квитанції.

3 Оскільки у вас немає постійного місця проживання або перебування в зоні дії відповідного закону
– ви можете для уникнення затримання (§ 127a Кримінально-процесуального кодексу [StPO])
– ви повинні для забезпечення кримінального провадження/провадження у справі про адміністративне правопорушення (§ 132 StPO), § 46 Закону про адміністративні правопорушення (OWiG)
внести заставу за очікуваний штраф/пеню, а також за судові витрати. Якщо у вас немає євро, застава може бути внесена в іншій конвертованій валюті, в цінних паперах, шляхом застави майна або поруки відповідних третіх осіб.

Якщо у випадку § 132 StPO ви не внесете заставу добровільно і не призначите уповноваженого на отримання документів, транспортні засоби або інші предмети, які ви везете з собою і які вам належать, будуть конфісковані. Ви можете в будь-який час подати заяву про прийняття судового рішення з цього приводу до компетентного дільничного суду (§ 132 абз. 3 у поєднанні з § 98 абз. 2 StPO). У вас є можливість викупити конфісковані предмети, перерахувавши заставу на рахунок, вказаний у п. 2, і, за необхідності, додатково призначивши уповноваженого на отримання документів (див. п. 4).

Грошова сума або предмети передаються компетентному органу. У разі набрання покаранням законної сили застава зараховується в рахунок штрафу/пені та судових витрат, а конфісковані предмети, за їх наявності, реалізуються. Якщо штраф/пеня не призначається або призначається в меншому розмірі, сума, що залишилася, або предмет повертається вам.

4 Роз'яснення згідно з § 153a StPO:
"Вам було роз'яснено, що прокуратура за вашою згодою відповідно до § 153a абз. 1 Кримінально-процесуального кодексу (StPO) може відмовитися від висунення звинувачення в обмін на виплату штрафу в розмірі внесеної вами застави на користь державної скарбниці. Крім того, вам було повідомлено, що діяння в такому випадку більше не буде каратися як правопорушення, а справа буде остаточно закрита без додаткових витрат і внесення запису до Федерального центрального реєстру судимостей.
Як обвинувачений, якому додатково було роз'яснено, що в іншому випадку проти нього може бути висунуто публічне звинувачення, ви згодні із закриттям справи та внесенням внесеної вами застави як штрафу згідно з § 153a абз. 1 StPO."

Будь ласка, вкажіть свої/інші банківські реквізити на випадок, якщо сума, що залишилася, має бути вам повернута.

5 Своїм підписом ви підтверджуєте отримання копії "Протоколу про внесення застави" та цього інформаційного/інструктивного аркуша. Співробітник поліції підтверджує отримання внесеної вами застави своїм підписом.`
  },
  hi: { 
    security_deposit: `1 आरोपी/प्रभावित व्यक्ति के रूप में आपके व्यक्तिगत विवरण का उल्लेख।

2 जिस आपराधिक/प्रशासनिक अपराध का आप पर आरोप है, सुरक्षा जमा के लिए जिम्मेदार प्राधिकरण, साथ ही उसके बैंक विवरण और रसीद संख्या का उल्लेख।

3 चूंकि आपके पास संबंधित कानून के दायरे में कोई निश्चित निवास या ठिकाना नहीं है
- आप अपनी गिरफ्तारी से बचने के लिए (आपराधिक प्रक्रिया संहिता की धारा 127a [StPO])
- आपको आपराधिक/जुर्माना कार्यवाही (धारा 132 StPO), प्रशासनिक अपराध अधिनियम की धारा 46 (OWiG) को सुरक्षित करने के लिए
अपेक्षित जुर्माने/दंड और कार्यवाही की लागत के लिए एक सुरक्षा प्रदान करनी चाहिए। यदि आपके पास यूरो नहीं हैं, तो सुरक्षा किसी अन्य परिवर्तनीय मुद्रा में, प्रतिभूतियों में, गिरवी रखकर या उपयुक्त तीसरे पक्ष की गारंटी द्वारा प्रदान की जा सकती है।

यदि धारा 132 StPO के मामले में, आप स्वेच्छा से सुरक्षा जमा प्रदान नहीं करते हैं और दस्तावेजों की तामील के लिए किसी अधिकृत प्रतिनिधि का नाम नहीं देते हैं, तो आपके द्वारा ले जाए जा रहे और आपके स्वामित्व वाले परिवहन के साधन या अन्य वस्तुओं को जब्त कर लिया जाएगा। आप इसके लिए किसी भी समय सक्षम स्थानीय न्यायालय से न्यायिक निर्णय का अनुरोध कर सकते हैं (धारा 132(3) के साथ पठित धारा 98(2) StPO)। आपके पास आइटम 2 के तहत निर्दिष्ट खाते में सुरक्षा जमा राशि स्थानांतरित करके और यदि लागू हो, तो दस्तावेजों की तामील के लिए बाद में किसी अधिकृत प्रतिनिधि का नाम देकर जब्त की गई वस्तुओं को मुक्त कराने का विकल्प है (देखें आइटम 4)।

धनराशि या वस्तुएं सक्षम प्राधिकारी को सौंप दी जाएंगी। कानूनी रूप से बाध्यकारी सजा के मामले में, सुरक्षा जमा को जुर्माने/दंड और कार्यवाही की लागत से घटा दिया जाएगा, और किसी भी जब्त की गई वस्तु का उपयोग किया जाएगा। यदि कोई जुर्माना/दंड निर्धारित नहीं किया गया है या कम राशि का जुर्माना/दंड निर्धारित किया गया है, तो शेष राशि या वस्तु आपको वापस कर दी जाएगी।

4 धारा 153a StPO के अनुसार निर्देश:
"आपको सूचित किया गया है कि लोक अभियोजक का कार्यालय, आपकी सहमति से, आपराधिक प्रक्रिया संहिता (StPO) की धारा 153a(1) के अनुसार, राज्य के खजाने के पक्ष में आपके द्वारा प्रदान की गई सुरक्षा जमा की राशि में जुर्माना अदा करने के बदले में आरोप दायर करने से बच सकता है। आपको यह भी सूचित किया गया है कि तब इस कृत्य को अपराध के रूप में दंडित नहीं किया जाएगा, बल्कि बिना कोई अतिरिक्त लागत लगाए और संघीय केंद्रीय रजिस्टर में प्रविष्टि किए बिना कार्यवाही अंतिम रूप से बंद कर दी जाएगी।
एक आरोपी व्यक्ति के रूप में जिसे यह भी सूचित किया गया है कि अन्यथा आपके खिलाफ सार्वजनिक आरोप दायर किए जा सकते हैं, आप कार्यवाही को बंद करने और धारा 153a(1) StPO के अनुसार आपके द्वारा जुर्माने के रूप में प्रदान की गई सुरक्षा जमा से सहमत हैं।"

कृपया अपने/अन्य बैंक विवरण प्रदान करें यदि कोई शेष राशि आपको वापस करनी हो।

5 अपने हस्ताक्षर से, आप पुष्टि करते हैं कि आपको "सुरक्षा जमा का रिकॉर्ड" और यह सूचना/निर्देश पत्रक की एक प्रति प्राप्त हुई है। पुलिस अधिकारी अपने हस्ताक्षर से आपके द्वारा प्रदान की गई सुरक्षा की प्राप्ति की पुष्टि करता है।`
  },
  bg: { 
    security_deposit: `1 Посочване на Вашите лични данни като обвиняем/засегнато лице.

2 Посочване на престъплението/административното нарушение, в което сте обвинени, на органа, отговарящ за гаранцията, както и неговите банкови данни и референтен номер.

3 Тъй като нямате постоянно местожителство или пребиваване в обхвата на съответния закон
– можете, за да избегнете ареста си (чл. 127a от Наказателно-процесуалния кодекс [StPO])
– трябва, за да обезпечите наказателното производство/производството за налагане на глоба (чл. 132 StPO), чл. 46 от Закона за административните нарушения (OWiG)
да предоставите гаранция за очакваната глоба/наказание, както и за разноските по производството. Ако не разполагате с евро, гаранцията може да бъде предоставена в друга конвертируема валута, в ценни книжа, чрез залог или чрез поръчителство на подходящи трети лица.

Ако в случая на чл. 132 StPO не предоставите доброволно гаранцията и не посочите упълномощен представител за връчване, транспортните средства или други вещи, които носите със себе си и които Ви принадлежат, ще бъдат конфискувани. По всяко време можете да поискате съдебно решение по този въпрос от компетентния районен съд (чл. 132, ал. 3 във връзка с чл. 98, ал. 2 StPO). Имате възможност да освободите конфискуваните вещи, като преведете сумата на гаранцията по сметката, посочена в точка 2, и, ако е приложимо, като впоследствие посочите упълномощен представител за връчване (вж. точка 4).

Паричната сума или вещите ще бъдат предадени на компетентния орган. В случай на влязло в сила наказание гаранцията ще бъде приспадната от глобата/наказанието и разноските по производството, а евентуално конфискуваните вещи ще бъдат осребрени. Ако не бъде определена глоба/наказание или бъде определена глоба/наказание в по-нисък размер, оставащата сума или вещта ще Ви бъде възстановена.

4 Инструкция съгласно чл. 153a StPO:
"Информирани сте, че прокуратурата, с Ваше съгласие, съгласно чл. 153a, ал. 1 от Наказателно-процесуалния кодекс (StPO), може да се въздържи от повдигане на обвинение в замяна на плащане на глоба в размер на предоставената от Вас гаранция в полза на държавната хазна. Също така Ви е съобщено, че деянието вече няма да се наказва като нарушение, а производството ще бъде окончателно прекратено без допълнителни разходи и без вписване във Федералния централен регистър.
Като обвиняем, който освен това е бил информиран, че в противен случай срещу Вас могат да бъдат повдигнати публични обвинения, Вие се съгласявате с прекратяването на производството и с предоставената от Вас гаранция като глоба съгласно чл. 153a, ал. 1 StPO."

Моля, посочете Вашите/други банкови данни в случай, че оставаща сума трябва да Ви бъде възстановена.

5 С подписа си потвърждавате, че сте получили копие от „Протокол за предоставяне на гаранция“ и този информационен/инструктивен лист. Полицейският служител потвърждава с подписа си получаването на предоставената от Вас гаранция.`
  },
  cs: { 
    security_deposit: `1 Uvedení vašich osobních údajů jako obviněného/dotčené osoby.

2 Uvedení trestného činu/správního deliktu, ze kterého jste obviněni, orgánu odpovědného za kauci, jakož i jeho bankovních údajů a referenčního čísla.

3 Vzhledem k tomu, že nemáte trvalé bydliště nebo pobyt v oblasti působnosti příslušného zákona
– můžete, abyste se vyhnuli zatčení (§ 127a trestního řádu [StPO])
– musíte, k zajištění trestního řízení / řízení o pokutě (§ 132 StPO), § 46 zákona o správních deliktech (OWiG)
poskytnout kauci na očekávanou pokutu/trest a na náklady řízení. Pokud nemáte eura, kauce může být poskytnuta v jiné směnitelné měně, v cenných papírech, zástavou nebo ručením vhodných třetích stran.

Pokud v případě § 132 StPO kauci dobrovolně neposkytnete a neurčíte zmocněnce pro doručování, dopravní prostředky nebo jiné předměty, které máte u sebe a které vám patří, budou zabaveny. V této věci můžete kdykoli požádat o soudní rozhodnutí příslušný okresní soud (§ 132 odst. 3 ve spojení s § 98 odst. 2 StPO). Máte možnost zabavené předměty uvolnit převodem kauce na účet uvedený v bodě 2 a případně dodatečným určením zmocněnce pro doručování (viz bod 4).

Peněžní částka nebo předměty budou předány příslušnému orgánu. V případě pravomocného trestu bude kauce započtena proti pokutě/trestu a nákladům řízení a případné zabavené věci budou zpeněženy. Pokud není stanovena žádná pokuta/trest nebo je stanovena pokuta/trest v nižší částce, zbývající částka nebo věc vám bude vrácena.

4 Poučení podle § 153a StPO:
"Byl jste poučen o tom, že státní zastupitelství s vaším souhlasem podle § 153a odst. 1 trestního řádu (StPO) může upustit od vznesení obžaloby výměnou za zaplacení pokuty ve výši vámi poskytnuté kauce ve prospěch státní pokladny. Rovněž vám bylo sděleno, že čin pak již nebude trestán jako přestupek, ale řízení bude s konečnou platností zastaveno bez vzniku dodatečných nákladů a bez provedení záznamu ve Spolkovém centrálním rejstříku.
Jako obviněný, který byl dále poučen o tom, že by jinak proti vám mohla být vznesena veřejná obžaloba, souhlasíte se zastavením řízení a s vámi poskytnutou kaucí jako pokutou podle § 153a odst. 1 StPO."

Uveďte prosím své/jiné bankovní spojení pro případ, že by vám musela být vrácena zbývající částka.

5 Svým podpisem potvrzujete, že jste obdrželi kopii „Protokolu o složení kauce“ a tohoto informačního/poučného listu. Policista potvrzuje svým podpisem přijetí vámi poskytnuté kauce.`
  },
  
  lt: { 
    security_deposit: `1 Jūsų, kaip kaltinamojo / susijusio asmens, asmens duomenų nurodymas.

2 Nusikalstamos veikos / administracinio teisės pažeidimo, kuriuo esate kaltinamas, nurodymas, už užstatą atsakingos institucijos, jos banko rekvizitų ir bylos numerio nurodymas.

3 Kadangi neturite nuolatinės gyvenamosios vietos ar buvimo vietos atitinkamo įstatymo taikymo srityje
– galite, siekdami išvengti suėmimo (Baudžiamojo proceso kodekso [StPO] 127a str.)
– privalote, siekdami užtikrinti baudžiamąjį / baudų procesą (StPO 132 str.), Administracinių nusižengimų įstatymo (OWiG) 46 str.
pateikti užstatą už numatomą baudą / bausmę ir proceso išlaidas. Jei neturite eurų, užstatas gali būti pateiktas kita konvertuojama valiuta, vertybiniais popieriais, įkeičiant turtą arba pateikiant tinkamų trečiųjų šalių garantiją.

Jei, esant StPO 132 str. numatytam atvejui, jūs savanoriškai nepateikiate užstato ir nepaskiriate įgaliotojo atstovo dokumentams įteikti, jūsų gabenamos ir jums priklausančios transporto priemonės ar kiti daiktai bus konfiskuoti. Dėl to galite bet kuriuo metu prašyti teismo sprendimo iš kompetentingo apylinkės teismo (StPO 132 str. 3 d. kartu su 98 str. 2 d.). Konfiskuotus daiktus galite atsiimti pervedę užstatą į 2 punkte nurodytą sąskaitą ir, jei taikoma, vėliau paskyrę įgaliotąjį atstovą dokumentams įteikti (žr. 4 punktą).

Pinigų suma arba daiktai bus perduoti kompetentingai institucijai. Įsiteisėjusio nuosprendžio atveju užstatas bus įskaitytas į baudą / bausmę ir proceso išlaidas, o konfiskuoti daiktai bus realizuoti. Jei bauda / bausmė nepaskiriama arba paskiriama mažesnė bauda / bausmė, likusi suma arba daiktas jums bus grąžinti.

4 Instrukcija pagal StPO 153a str.:
„Jums buvo pranešta, kad prokuratūra, gavusi jūsų sutikimą, pagal Baudžiamojo proceso kodekso (StPO) 153a str. 1 d. gali atsisakyti pateikti kaltinimus mainais į baudos, lygios jūsų valstybės iždui pateikto užstato sumai, sumokėjimą. Taip pat buvote informuoti, kad tuomet veika nebebus baudžiama kaip nusižengimas, o procesas bus galutinai nutrauktas nepatiriant papildomų išlaidų ir nedarant įrašo Federaliniame centriniame registre.
Kaip kaltinamasis, kuris taip pat buvo informuotas, kad kitu atveju jums gali būti pateikti vieši kaltinimai, jūs sutinkate su proceso nutraukimu ir jūsų pateikto užstato kaip baudos naudojimu pagal StPO 153a str. 1 d.“

Prašome nurodyti savo / kitus banko rekvizitus tam atvejui, jei jums reikėtų grąžinti likusią sumą.

5 Pasirašydami patvirtinate, kad gavote „Užstato pateikimo protokolo“ kopiją ir šį informacinį / instrukcijų lapą. Policijos pareigūnas pasirašydamas patvirtina jūsų pateikto užstato gavimą.`
  },
  nl: { 
    security_deposit: `1 Vermelding van uw persoonsgegevens als beschuldigde/betrokkene.

2 Vermelding van het strafbare feit/de administratieve overtreding waarvan u wordt beschuldigd, van de autoriteit die verantwoordelijk is voor de borgsom, evenals haar bankgegevens en referentienummer.

3 Aangezien u geen vaste woon- of verblijfplaats heeft binnen het toepassingsgebied van de betreffende wet
– kunt u, om uw arrestatie te voorkomen (§ 127a Wetboek van Strafvordering [StPO])
– moet u, om de straf-/boeteprocedure veilig te stellen (§ 132 StPO), § 46 van de Wet op administratieve overtredingen (OWiG)
een borgsom betalen voor de te verwachten boete/straf en voor de kosten van de procedure. Als u niet over euro's beschikt, kan de borgsom worden voldaan in een andere inwisselbare valuta, in effecten, door inpandgeving of door borgtocht van geschikte derden.

Als u in het geval van § 132 StPO de borgsom niet vrijwillig betaalt en geen gemachtigde voor de betekening van documenten aanwijst, worden vervoermiddelen of andere voorwerpen die u bij u heeft en die uw eigendom zijn, in beslag genomen. U kunt hiervoor te allen tijde een rechterlijke beslissing aanvragen bij de bevoegde kantonrechter (§ 132 lid 3 juncto § 98 lid 2 StPO). U heeft de mogelijkheid om de in beslag genomen voorwerpen vrij te geven door de borgsom over te maken naar de onder nr. 2 vermelde rekening en eventueel door alsnog een gemachtigde voor de betekening aan te wijzen (zie nr. 4).

Het geldbedrag of de voorwerpen worden overgedragen aan de bevoegde autoriteit. In het geval van een rechtsgeldige bestraffing wordt de borgsom verrekend met de boete/straf en de kosten van de procedure, en worden eventueel in beslag genomen voorwerpen te gelde gemaakt. Als er geen of een lagere boete/straf wordt opgelegd, wordt het resterende bedrag of het voorwerp aan u geretourneerd.

4 Instructie conform § 153a StPO:
"U bent erover geïnformeerd dat het openbaar ministerie met uw instemming conform § 153a lid 1 van het Wetboek van Strafvordering (StPO) kan afzien van vervolging in ruil voor betaling van een boete ter hoogte van de door u betaalde borgsom ten gunste van de staatskas. Ook is u medegedeeld dat het feit dan niet meer als overtreding wordt bestraft, maar dat de procedure definitief wordt stopgezet zonder dat er extra kosten ontstaan en zonder dat er een aantekening in het federale centrale register wordt gemaakt.
Als beschuldigde die er tevens over is geïnformeerd dat anders de publieke aanklacht tegen u kan worden ingediend, gaat u akkoord met het stopzetten van de procedure en de door u betaalde borgsom als boete conform § 153a lid 1 StPO."

Geef a.u.b. voor het geval er een restbedrag aan u moet worden geretourneerd uw/een andere bankverbinding op.

5 U bevestigt met uw handtekening dat u een kopie van het „Proces-verbaal inzake een borgsom“ en dit informatie-/instructieblad heeft ontvangen. De politieambtenaar bevestigt door ondertekening de ontvangst van de door u betaalde borgsom.`
  },
  hr: { 
    security_deposit: `1 Navođenje Vaših osobnih podataka kao optuženika/pogođene osobe.

2 Navođenje kaznenog/prekršajnog djela za koje se teretite, tijela nadležnog za jamčevinu, kao i njegovih bankovnih podataka i referentnog broja.

3 Budući da nemate prebivalište ili boravište na području primjene dotičnog zakona
– možete, kako biste izbjegli uhićenje (§ 127.a Zakona o kaznenom postupku [StPO])
– morate, kako biste osigurali kazneni/prekršajni postupak (§ 132. StPO), § 46. Zakona o prekršajima (OWiG)
položiti jamčevinu za očekivanu novčanu kaznu te za troškove postupka. Ako ne raspolažete eurima, jamčevina se može položiti u drugoj konvertibilnoj valuti, u vrijednosnim papirima, zalogom ili jamstvom prikladnih trećih osoba.

Ako u slučaju § 132. StPO ne položite dobrovoljno jamčevinu i ne imenujete opunomoćenika za dostavu, prijevozna sredstva ili drugi predmeti koje imate kod sebe i koji Vam pripadaju bit će oduzeti. S tim u vezi u svakom trenutku možete zatražiti sudsku odluku od nadležnog općinskog suda (§ 132. st. 3. u vezi s § 98. st. 2. StPO). Imate mogućnost otkupiti zaplijenjene predmete prijenosom jamčevine na račun naveden pod točkom 2 i, prema potrebi, naknadnim imenovanjem opunomoćenika za dostavu (vidi točku 4).

Novčani iznos ili predmeti bit će predani nadležnom tijelu. U slučaju pravomoćne kazne jamčevina će se uračunati u novčanu kaznu i troškove postupka te će se unovčiti eventualno oduzeti predmeti. Ako se novčana kazna ne odredi ili se odredi u manjem iznosu, preostali iznos ili predmet bit će Vam vraćen.

4 Pouka u skladu s § 153.a StPO:
"Poučeni ste da državno odvjetništvo, uz Vašu suglasnost, prema § 153.a st. 1. Zakona o kaznenom postupku (StPO) može odustati od podizanja optužnice u zamjenu za plaćanje kazne u visini jamčevine koju ste položili u korist državne blagajne. Također Vam je priopćeno da se djelo tada više neće kažnjavati kao prekršaj, već će se postupak konačno obustaviti bez dodatnih troškova i bez upisa u Savezni središnji registar.
Kao okrivljenik koji je također poučen da bi se inače protiv Vas mogla podići javna optužba, pristajete na obustavu postupka i na jamčevinu koju ste položili kao kaznu u skladu s § 153.a st. 1. StPO."

Molimo navedite svoje/druge bankovne podatke za slučaj da Vam se mora vratiti preostali iznos.

5 Svojim potpisom potvrđujete da ste primili presliku „Zapisnika o polaganju jamčevine“ i ovog informativnog/poučnog lista. Policijski službenik svojim potpisom potvrđuje primitak jamčevine koju ste položili.`
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
            Diese Applikation arbeitet primär vollständig lokal auf Ihrem Endgerät ("Client-Side"). Es werden von der Applikationslogik selbst keinerlei personenbezogene Daten (wie Berechnungen, Gewichte, Winkel etc.) an externe Server übertragen oder dort gespeichert.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">2. Hosting (Vercel)</h3>
          <p className="text-slate-600 leading-relaxed">
            Wir hosten unsere Website bei Vercel. Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Wenn Sie unsere Website besuchen, erfasst Vercel serverseitig standardmäßig Verbindungsdaten (z. B. Ihre IP-Adresse, Browsertyp, Datum und Uhrzeit des Abrufs) in sogenannten Server-Logfiles, um die fehlerfreie Auslieferung der Website und die IT-Sicherheit zu gewährleisten. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Weitere Details finden Sie in der Datenschutzerklärung von Vercel.
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
