import re
from calendar import monthrange

def is_valid_date(d):
	if not re.match('^\d+$', d):
		raise ValueError('Not a valid date')
		
	dd, mm, yyyy = [int(i) for i in [d[:2], d[2:4], d[4:]]]
	
	if yyyy < 1855 or yyyy > 2039: 
		return False
	if mm < 1 or mm > 12: 
		return False
	if dd < 1 or dd > monthrange(yyyy, mm)[-1]: 
		return False
	
	return True
	
def get_range(year):
	if year >= 1855 and year <= 1899:
		return range(500, 750)
	if year >= 1900 and year <= 1999: 
		return range(500)
	if year >= 2000 and year <= 2039: 
		return range(500,1000)
		
	return range(0)	

def generate_national_id_numbers(d):
	if type(d) is not str or not is_valid_date(d):
		raise ValueError('Expected a valid date-string with the format: DDMMYYYY, but got: {}'.format(d))

	year, dt, result = int(d[4:]), [int(i) for i in d], []
	
	for i in get_range(year):
		n = list(map(int, list(str(i).zfill(3))))
		k1 = 11 - ((3*dt[0] + 7*dt[1] + 6*dt[2] + 1*dt[3] + 8*dt[-2] + 9*dt[-1] + 4*n[0] + 5*n[1] + 2*n[2]) % 11)
		k2 = 11 - ((5*dt[0] + 4*dt[1] + 3*dt[2] + 2*dt[3] + 7*dt[-2] + 6*dt[-1] + 5*n[0] + 4*n[1] + 3*n[2] + 2*k1) % 11)
		
		if k1 < 10 and k2 < 10: 
			result.append(''.join(list(map(str, dt[:4] + dt[6:] + n + [k1,k2]))))
			
	return result
	


print(generate_national_id_numbers('16101990'))