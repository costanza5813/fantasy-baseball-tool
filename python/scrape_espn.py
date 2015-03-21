import urllib2, cookielib, re, jsonpickle
from bs4 import BeautifulSoup

class Batter:
    def __init__( self, data ):
        self.pid     = data[0]
        self.name    = data[1]
        self.team    = data[2]
        self.pos     = data[3]
        self.status  = data[4]
        self.r       = data[5]
        self.singles = data[6]
        self.doubles = data[7]
        self.triples = data[8]
        self.hr      = data[9]
        self.rbi     = data[10]
        self.bb      = data[11]
        self.sb      = data[12]
        self.pts     = data[13]

class Pitcher:
    def __init__( self, data ):
        self.pid    = data[0]
        self.name   = data[1]
        self.team   = data[2]
        self.pos    = data[3]
        self.status = data[4]
        self.ip     = data[5]
        self.er     = data[6]
        self.k      = data[7]
        self.cg     = data[8]
        self.so     = data[9]
        self.w      = data[10]
        self.sv     = data[11]
        self.pts    = data[12]

def isPos( pos ):
    allPos = ['C', '1B', '2B', '3B', 'SS', 'OF', 'RP', 'SP', 'DH']
    if pos in allPos:
        return True
    else:
        return False

def handleNameTeamPos( sName, sNameTeamPos ):
    sReturn = [str(sName)]
    sTeamPos = sNameTeamPos[len(sName)+2:]
    p = re.compile('[\w]+')
    m = p.findall(sTeamPos)
    sReturn.append(str(m[0]).upper())
    pos = ''
    status = ''
    for i in range(1,len(m)):
        if isPos(str(m[i])):
            pos += str(m[i]) + ' ';
        else:
            status = str(m[i])

    sReturn.append(pos)
    sReturn.append(status)
    return sReturn

def main():
    batters = []
    pitchers = []
    cj = cookielib.MozillaCookieJar('/home/kevin/workspace/fantasy-baseball-tool/python/cookies.txt')
    cj.load()
    opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))

    for startIdx in range(0,641,40):
        soup = BeautifulSoup(opener.open('http://games.espn.go.com/flb/tools/projections?leagueId=71301&slotCategoryGroup=1&startIndex=' + str(startIdx)).read())

        for row in soup.find_all('table')[1].find_all('tr'):
            tds = row.find_all('td')
            pData = []
            pData.append(row.get('id'))
            for i in range(len(tds)):
                if i == 0 and tds[i].string == 'RNK':
                    break	
                elif i == 1:
                    pData.extend(handleNameTeamPos(tds[i].find('a').string, tds[i].get_text()))
                elif i == 2 or i == 3:
                    continue
                elif i > 0:
                    if tds[i].string == '--':
                        pData.append(0)
                    else:
                        pData.append(int(tds[i].string))

            if len(pData) == 14:
                batters.append(Batter(pData))

    f = open('batters.json', 'w')
    f.write(jsonpickle.encode(batters, unpicklable=False))
    f.close()

    for startIdx in range(0,681,40):
        soup = BeautifulSoup(opener.open('http://games.espn.go.com/flb/tools/projections?leagueId=71301&slotCategoryGroup=2&startIndex=' + str(startIdx)).read())

        for row in soup.find_all('table')[1].find_all('tr'):
            tds = row.find_all('td')
            pData = []
            pData.append(row.get('id'))
            for i in range(len(tds)):
                if i == 0 and tds[i].string == 'RNK':
                    break	
                elif i == 1:
                    pData.extend(handleNameTeamPos(tds[i].find('a').string, tds[i].get_text()))
                elif i == 2 or i == 3:
                    continue
                elif i == 4 or i == 11:
                    if tds[i].string == '--':
                        pData.append(0.0)
                    else:
                        pData.append(float(tds[i].string))
                elif i > 0:
                    if tds[i].string == '--':
                        pData.append(0)
                    else:
                        pData.append(int(tds[i].string))

            if len(pData) == 13:
                pitchers.append(Pitcher(pData))

    f = open('pitchers.json', 'w')
    f.write(jsonpickle.encode(pitchers, unpicklable=False))
    f.close()

if __name__ == "__main__": main()
