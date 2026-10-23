import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def m(n): return f"{n//100}.{str(n%100).zfill(2)}"
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def cases(u, p):
    k = -(-u//p)
    return f"The {pl(u,' unit',' units')} at {pl(p,' unit',' units')} a case make {pl(k,' case',' cases')}, the last case holding {u-(k-1)*p}."
def weeks(u, w):
    k = u//w
    return f"The {pl(u,' unit',' units')} at {pl(w,' unit',' units')} a week last {pl(k,' week',' weeks')} with {pl(u-k*w,' unit',' units')} left."
def space(c, cw, sw):
    per = sw//cw; over = sw - per*cw
    k = -(-c//per)
    return f"The {pl(c,' case',' cases')} at {pl(cw,' inch',' inches')} wide sit {per} to a {sw} inch shelf, {pl(over,' inch',' inches')} left over; {pl(k,' shelf',' shelves')} hold them, the last shelf taking {c-(k-1)*per}."
def cost(c, pc, u):
    cc = c*pc
    pu = (2*cc + u)//(2*u)
    return f"The {pl(c,' case',' cases')} at ${m(pc)} a case come to ${m(cc)}, ${m(pu)} a unit."
random.seed(774)
R = random.randint
cases_ = [
 dict(fn="cases", args=["850","24"], expect=cases(850,24)),
 dict(fn="weeks", args=["850","130"], expect=weeks(850,130)),
 dict(fn="space", args=["36","9","48"], expect=space(36,9,48)),
 dict(fn="cost", args=["36","12.50","850"], expect=cost(36,1250,850)),
 dict(fn="cases", args=["1","1"], expect=cases(1,1)),
 dict(fn="cases", args=["840","24"], expect=cases(840,24)),
 dict(fn="cases", args=["1000000","1000"], expect=cases(1000000,1000)),
 dict(fn="weeks", args=["1","1"], expect=weeks(1,1)),
 dict(fn="weeks", args=["130","130"], expect=weeks(130,130)),
 dict(fn="space", args=["1","1","1"], expect=space(1,1,1)),
 dict(fn="space", args=["5","48","48"], expect=space(5,48,48)),
 dict(fn="cost", args=["1","0.01","1"], expect=cost(1,1,1)),
 dict(fn="cost", args=["1000000","999.99","1000000"], expect=cost(1000000,99999,1000000)),
]
for _ in range(20):
    u,p=R(1,1000000),R(1,1000); cases_.append(dict(fn="cases", args=[str(u),str(p)], expect=cases(u,p)))
for _ in range(20):
    u,w=R(1,1000000),R(1,100000); cases_.append(dict(fn="weeks", args=[str(u),str(w)], expect=weeks(u,w)))
for _ in range(20):
    c=R(1,1000000); cw=R(1,100); sw=R(cw,1000); cases_.append(dict(fn="space", args=[str(c),str(cw),str(sw)], expect=space(c,cw,sw)))
for _ in range(25):
    c,p,u=R(1,1000000),R(1,99999),R(1,1000000); cases_.append(dict(fn="cost", args=[str(c),dec(p),str(u)], expect=cost(c,p,u)))
errs=[["cases",["0","24"]],["cases",["1000001","24"]],["cases",["3.5","24"]],["cases",["850","0"]],["cases",["850","1001"]],["cases",["850","x"]],
 ["weeks",["0","130"]],["weeks",["850","0"]],["weeks",["850","100001"]],["weeks",["850","1.5"]],
 ["space",["0","9","48"]],["space",["36","0","48"]],["space",["36","101","48"]],["space",["36","9","1001"]],["space",["36","48","9"]],
 ["cost",["0","12.50","850"]],["cost",["36","0","850"]],["cost",["36","1000","850"]],["cost",["36","12.505","850"]],["cost",["36","12.50","0"]]]
json.dump(dict(cases=cases_, errors=errs), open("expected.json","w"), indent=1)
print(len(cases_),"cases,",len(errs),"errcases")
