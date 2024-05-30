import re
import os

os.system('cls')

text_to_search = '''
abcdefghijklmnopqurtuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
1234567890

Ha HaHa

MetaCharacters (Need to be escaped):
. ^ $ * + ? { } [ ] \ | ( )

coreyms.com

321-555-4321
123.555.1234
123*555*1234
800-555-1234
900-555-1234

Mr. Schafer
Mr Smith
Ms Davis
Mrs. Robinson
Mr. T
'''

sentence = 'Start a sentence and then bring it to an end'

text_to_search = '''
moon man meet mat mountaintop
'''

pattern = re.compile(r'^m')
matches = re.sub(pattern, 'XYZ', text_to_search)
print(matches)
# print(matches.group(0))