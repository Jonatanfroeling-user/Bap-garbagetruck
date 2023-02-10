import json, os, sys
from random import randint


# target strets of ronse
RONSE_STREETS = [ "Barreelstraat", "Blauwesteen", "Boontjesstraat", "Bossenberg", "Bredestraat", "CoqBattant", "Delmottestraat", "Elzeelsesteenweg", "Elzelestraat", "Ephrem", "Europastraat", "Geraardsbergenstraat", "Germinal", "GroteMarijve", "Hendrik", "Consciencestraat", "Industriëlestraat", "Jagersstraat", "JeanMonnetstraat", "Kattemolenstraat", "Kersenstraat", "KleinFrankrijkstraat", "KleineMarijve", "Konrad", "Adenauerstraat", "Lievensveld", "Linde", "Lorettestraat", "Maagdenstraat", "MarcelLermusiaukerf", "Materveldstraat", "Minderbroedersstraat", "Monseigneur", "Beylsstraat", "Nachtegaalstraat", "Ooststraat", "OscarDelghuststraat", "Papekouters", "Paul-Henri", "Spaakstraat", "RobertSchumanstraat", "Rodekruisstraat", "Rotterij", "Schoonboeke", "StijnStreuvelsstraat", "Veemarkt", "Verlorenstraat", "VictorHugostraat", "Waaienberg", "Waatsbrugstraat", "Watkynestraat", "Weverijstraat", "ZénobeGrammestraat"]


# output data in json format
def out(json_dict, path=None):
    if not path:
        path = './data/'
    filename = os.path.basename(sys.argv[0]).split('.')[0]
    
    with open(path+"ronse-"+filename+"-"+str(randint(0,999))+".json", "w") as outfile:
        json.dump(json_dict, outfile, indent=4, sort_keys=False)
        

# stuout progress bar
def printProgress(done, max=100, msg=''):
    sys.stdout.write('\r[{}{}]{}'.format('🥑' * done, '..' * (max-done), str(done)+"/"+str(max)+"  "+msg  ))
    sys.stdout.flush()
    
    
def getHtmlName():
    path = '../Examples/'
    filename = os.path.basename(sys.argv[0]).split('.')[0]
    return path+filename+"-"+str(randint(0,999))+".html"
