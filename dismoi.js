exports.action = function(data, callback, config, SARAH) {


plugduxml=data.plugduxml
if ( plugduxml ==null ) { 
	plugduxml=0
}

fs = require('fs');
xml2js = require('xml2js') ;
parser = new xml2js.Parser({trim: true});
path = require('path');
nomplugin="" ;   nombreplugin=0

//le nom des plugins
config=SARAH.ConfigManager.getConfig();

data1='{"nompluguine":[]}';
file=Object.keys(config.modules).forEach(function(plugin) {
	nombreplugin=nombreplugin+1 ; 
	nomplugin=nomplugin+", "+plugin;

	//dans un json nom pluguine
 	objet = JSON.parse(data1);   
 	jsonStr = JSON.stringify(objet); // transforme l'objet en texte
  	jsonStr1 = JSON.stringify(plugin); // la valeur de l'item.

	try {
		jsonStr1=jsonStr1.replace(/"/g,'');//on met au bon format
		//console.log("           "+jsonStr1)
    } catch (Exception) {
    	console.log("     pas de tag out      ");
    }

	//on pousse en memoire
	objet.nompluguine.push(jsonStr1); 
	new_jsonStr = JSON.stringify(objet);
	data1=new_jsonStr;
	//console.log('le json seras alors '+data1)
});

//console.log('nom de plugs'+nomplugin) ;
callback({'tts': "il y a " + nombreplugin + ",pluguine"}) ; 
SARAH.speak("qui se nomme " + nomplugin);
console.log('le json seras alors '+data1)


cd=(objet.nompluguine[plugduxml]);
//console.log('objeteeeeeeeeeeeeeeeeeeeeeeeee'+cd)
cd1=cd.replace(/"/g,'');
//console.log("objet1111111111111111111111111111" + cd1);
  
pathname = __dirname + '/../'+cd1+'/'+cd1+'.xml';
console.log(' -------------------------------------------- nom du plug: '+pathname);


// on cree le xml..................

datas_xml='<grammar version="1.0" xml:lang="fr-FR" mode="voice" root="dismoi" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">\n';
datas_xml+='<rule id="dismoi" scope="public"><example>Sarah lance google</example><tag>out.action=new Object(); </tag>\n';
datas_xml+='<item>Sarah</item>\n';
datas_xml+='<one-of>\n';
datas_xml+='<item>dis-moi les phrases de</item>\n';
datas_xml+='</one-of>\n';
datas_xml+='<item repeat="0-1">\n';
datas_xml+='<one-of>\n';


console.log(nombreplugin);
for ( i = 0; i < nombreplugin; i++) {  
	cd2=(objet.nompluguine[i]);
	console.log("objet" + i + cd2);
	datas_xml+='<item>'+cd2+'<tag>out.action.plugduxml="' + i +'"</tag></item>\n';   
}

datas_xml+='</one-of>\n';
datas_xml+='</item><tag>out.action._attributes.uri="http://127.0.0.1:8080/sarah/dismoi";</tag></rule> </grammar>\n';

var fs = require('fs');
fs.writeFile(__dirnname + "/dismoi1.xml", datas_xml, function(err) {
      if(err) {
      	console.log(err);
      } else {
      	console.log("plugin courses généré!");
      }
});

//on met le xml en mémoire et on traite les items

xml2js = require('xml2js');
fs = require('fs');
parser = new xml2js.Parser();
//  pathname = 'C:/Users/Administrateur/sarah/plugins/reveil.xml';
x=0;// iable pour les one-of

//SARAH.speak("qui rechercher " + nomplugin);

                            // 1er item  TOUJOURS LE MEME SCHEMA      
 
 // on lis le xml            
fs.readFile(pathname, function(err, data) {
  // on parse tout cela
	parser.parseString(data, function (err, result) { 
	      
	    // on récupere la ligne item complete
	    try {
	    	item1 = result.grammar.rule[0]['one-of'][0].item;
		} catch (Exception) {
			console.log("     pas de tag out      ");
			SARAH.speak('pas de phrase dans le xml');
		}
	 
		nombreitem = item1.length;      
	        
		data1='{"pluguine":[]}'; // se met la et pas ailleur

		// on récupere l'item et le tag de chaque phrase
		for (j = 0; j < nombreitem ;j++) {  
			item1 = result.grammar.rule[0]['one-of'][0].item[j];
		    //console.log('item1'+item1); 
		
		// le item(phrase d'appel seul sans tag) , item1.(phrase d'appel avec tag) , le item1.tag(le tag correspondant)  
		
			jsonStr1 = JSON.stringify(item1._); // la valeur de l'item._
		 
		  // si item seul alors tiem + null
		    if ( jsonStr1 ==null ) { 
		    	jsonStr1 = JSON.stringify(item1);// la valeur de l'item
				jsonStr2 = JSON.stringify(item1.tag);//la valeur du tag out
		    } else {
		  		jsonStr2 = JSON.stringify(item1.tag);//la valeur du tag out
			}
		//console.log(jsonStr1+"           "+jsonStr2)
		
			try {
				jsonStr1=jsonStr1.replace(/"/g,'');//on met au bon format
		//console.log("           "+jsonStr1)
			} catch (Exception) {
				console.log("     pas de tag out      ");
			}
		    
			try {
				jsonStr2=jsonStr2.replace(/"/g,'');
			} catch (Exception) {
				console.log("     pad de tag out      ");
			}
		    
		// on met dans un tableau json
			objet = JSON.parse(data1);   
			jsonStr = JSON.stringify(objet); // transforme l'objet en texte
		
		//on pousse en memoire
			objet.pluguine.push(jsonStr1,jsonStr2); new_jsonStr = JSON.stringify(objet);
		  	data1=new_jsonStr;
		//console.log('le json seras alors '+data1)
		
		}//fin for   j

		//console.log('le json123 seras alors '+data1)
		data100=data1;
	
		})//fin 1er item
		//console.log('le json456 seras alors '+data100) 
	
	
	                // on attaque les autres items avec ou sans leur one-of
		data1=data100;
	
	// on lis le xml  on parse tout cela
	    parser.parseString(data, function (err, result) {
	    	if (err) {console.log('eeeeeeeeeeeeeeeeeerreur de xml')};
	        // on récupere la ligne item complete
	        //  item1 = result.grammar.rule[0]['one-of'][0].item ;
	        item1 = result.grammar.rule[0].item ;
	
	  		nombreitem1 = item1.length;
	  		console.log('nombre de oneof'+nombreitem1)
	
	//  data1='{"pluguine":[]}'// se met la et pas ailleur
	
			data1=data1
	//console.log('le json45611 seras alors '+data1)
			for (  i = 1; i < nombreitem1 ;i++){ 
	  			item1 = result.grammar.rule[0].item[i]['one-of'][0].item ;
	  			nombreitem = item1.length;      
				console.log(nombreitem)        
	
	// on récupere l'item et le tag de chaque phrase
	 			for (  j = 0; j < nombreitem ;j++){  
	      			item1 = result.grammar.rule[0].item[i]['one-of'][0].item[j];
	    //console.log('item1'+item1); 
	
	// le item(phrase d'appel seul sans tag) , item1.(phrase d'appel avec tag) , le item1.tag(le tag correspondant)  
	
	  				jsonStr1 = JSON.stringify(item1._)// la valeur de l'item._
	 
	  // si item seul alors tiem + null
	    			if ( jsonStr1 ==null ) { 
	   					jsonStr1 = JSON.stringify(item1);// la valeur de l'item
	   					jsonStr2 = JSON.stringify(item1.tag);//la valeur du tag out
	    			} else {
	  					jsonStr2 = JSON.stringify(item1.tag);//la valeur du tag out
					}
	//console.log(jsonStr1+"           "+jsonStr2)
	// on met dans un tableau json
	  				objet = JSON.parse(data1);   
	  				jsonStr = JSON.stringify(objet); // transforme l'objet en texte
	
	//on pousse en memoire
					objet.pluguine.push(jsonStr1,jsonStr2); 
					new_jsonStr = JSON.stringify(objet);
	  				data1=new_jsonStr;
	//console.log('le json seras alors '+data1)
	
				}//fin for   j
			}//fin   i
	
	// on ecris le json
		console.log('le json seras alorssssssssssssssssssssss '+data1);
	 	pathname = __dirname + '/../'+cd1+'/'+cd1+'dismoi.json';
		console.log('nom du plug'+pathname);
	
		fs.writeFile(pathname, data1, function (err) { // ecrit dans le fichier courses l'objet + la nouvelle valeur
	   		if (err) throw err;
	  		console.log("valeur rajoutée : "+ data1);
	   		console.log(cd1);
		})
	})//fin autre item
	
	
	callback({'tts' : "terminer" });
}); // fs.read

 callback({'tts': ""});

//secteur JSON/base de données plug X
};
