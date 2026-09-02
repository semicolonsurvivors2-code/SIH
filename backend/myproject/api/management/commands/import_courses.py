# CSV must have columns: title,description,instructor,duration,price.
# Run it with:
# python manage.py import_courses /path/to/your/courses.csv
import csv
from django.core.management.base import BaseCommand
from api.models import Course

class Command(BaseCommand):
    help = 'Import courses from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')

    def handle(self, *args, **options):
        csv_path = options['csv_file']
        with open(csv_path, newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                Course.objects.create(
                    title=row['title'],
                    description=row.get('description', ''),
                    instructor=row['instructor'],
                    duration=int(row['duration']),
                    price=float(row['price'])
                )
        self.stdout.write(self.style.SUCCESS('Courses imported successfully.'))
