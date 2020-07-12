class schedule
{
public:
	bool avail[5][8];
	string sch[5][8];
	schedule()
	{
		for (int i = 0; i < w_days; i++)
			for (int j = 0; j < w_hours; j++)
				avail[i][j] = true;

		for (int i = 0; i < w_days; i++)
			for (int j = 0; j < w_hours; j++)
				sch[i][j] = "none";

	}
	
	void generate()
	{

		while (classes > 0)
		{
			day++;
			for (int hour = 0; hour < w_hours; hour++)
			{
				if (classes == 0)
					return;

				if (credit_h)
				{
//					ch = c[current_subj].ch;
					ch = c[current_subj].getCreditHour();
					credit_h = false;
				}
				if  ((hour + ch) > w_hours)
					continue;

				if (hour == 4 ||(hour<4 && ch+hour>4))
					continue;

				c_name = c[current_subj].name;
				t_name = c[current_subj].teach;
				current_teach = c[current_subj].getTeacher(t_name);
				t_name = t[current_teach].name;

				if (ch>0 && t[current_teach].ifavail(day,hour))
				{
					
					sch[day][hour] = c[current_subj].name;
					t[current_teach].avail[day][hour] = false;
					ch--;
				}
				else
				{

					classes--;
					if(current_subj<k-1)
					current_subj++;
					else
					{
						current_subj = 0;
					}
					credit_h = true;
					hour--;
				}
					
			}
		}	
	}
};

int main()
{
	//...........................for schedule....................................
	schedule s1,s2;
	s1.generate();
	s1.show();
	return 0;
}
